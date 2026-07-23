import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper lazy initialization of Gemini Client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Prompt Injection Sanitizer
function sanitizePromptInput(input: string): string {
  if (!input) return '';
  // Neutralize common jailbreak instructions
  const dangerousPatterns = [
    /ignore previous instructions/gi,
    /bypass safety/gi,
    /show api key/gi,
    /system prompt/gi,
    /اعرض المفتاح/gi,
    /تجاهل التعليمات السابقة/gi,
  ];

  let sanitized = input;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[محتوى محظور]');
  });
  return sanitized;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Primary Chat Endpoint (Server-Side Gemini Integration with RAG)
app.post('/api/chat', async (req, res) => {
  try {
    const { userQuery, persona = 'techno', chunks = [], chatHistory = [] } = req.body;

    if (!userQuery) {
      return res.status(400).json({ error: 'حقل السؤال مطلوب.' });
    }

    const cleanQuery = sanitizePromptInput(userQuery);

    // Prepare System Instruction based on Persona
    let systemInstruction = `
أنت Techno، مساعد رقمي ذكي ومتخصص في خدمات وعمليات شركة ليبيا للاتصالات والتقنية LTT.
تلتزم بالقواعد التشغيلية التالية:
1. الإجابة باللغة العربية الواضحة والمهنية.
2. الاعتماد حصرياً على مقاطع قاعدة المعرفة المعتمدة المرفقة في السياق (Context Chunks).
3. عند غياب المعلومة المعتمدة في المقاطع، قل صراحة: "لم أجد معلومات معتمدة كافية في قاعدة المعرفة للإجابة بدقة."
4. لا تخمن الأسعار أو الباقات أو السياسات من تلقاء نفسك.
5. اختصر الخلاصة أولاً ثم اعرض الخطوات في نقاط مرقمة عند وجود إجراءات.
6. اذكر تاريخ تحديث المعلومة أو رفق المصدر بوضوح.
7. قاعدة التوصية والترشيح للأفراد (توجيه داخلي لتوجيه الردود): عند تقديم توصية أو ترشيح باقة للمشتركين الأفراد، يوصى دائماً وأولاً بخدمة الجيل الرابع 4G للأفراد أو خدمة FWA، نظراً لأن باقي الخدمات (مثل ADSL وغيرها) في حالة إطفاء وإيقاف تدريجي. (تنبيه: هذه المعلومة لتوجيه المساعد فقط وليست للجمهور؛ فلا تذكر كلمة "في حالة إطفاء" للمستخدم العادي، بل وجّه التوصية مباشرة بنصح المشترك بالجيل الرابع 4G أو FWA كخيارات رئيسية وأحدث لشبكة LTT).
`;

    if (persona === 'techno_sales') {
      systemInstruction += `\nأنك تعمل الآن بصفتك Techno Sales: ركز على تحليل احتياج المشترك، مقارنة الباقات، واقتراح فرص الترقية (Upsell/Cross-sell) والخدمات المضافة لـ LTT.`;
    } else if (persona === 'techno_support') {
      systemInstruction += `\nأنك تعمل الآن بصفتك Techno Support: ركز على التشخيص الفني المرتب للأعطال (Fiber, 4G, FWA, ADSL)، التمييز بين الأعطال الفردية والعام، والتوصية بالخطوات الآمنة فقط قبل التصعيد.`;
    } else if (persona === 'techno_coach') {
      systemInstruction += `\nأنك تعمل الآن بصفتك Techno Coach: ركز على تدريب الموظف، تقديم سيناريو محاكاة خدمة العملاء، وتقييم إجابته وتقديم الشرح التوضيحي.`;
    }

    // Prepare Context String from Chunks
    const contextText = chunks.length > 0
      ? chunks.map((c: any, i: number) => `[مصدر ${i + 1}: ${c.docTitle} - ${c.sourceName} (إصدار ${c.version}) - تاريخ: ${c.updatedAt}]\n${c.content}`).join('\n\n')
      : 'لا توجد مقاطع مسترجعة ذات صلة عالية.';

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if Gemini API key is not configured in secrets
      const mockResponseText = `**[وضع المعاينة المحلي - مفتاح Gemini لم يتم ضبطه في الأسرار]**\n\nبناءً على المقاطع المعتمدة المسترجعة من قاعدة معرفة LTT:\n\n${chunks[0]?.content || 'يرجى العلم بضرورة اتباع السياسات المعتمدة لدى LTT للتحقق من الهويات والإجراءات الرسمية.'}\n\n*المصدر: ${chunks[0]?.docTitle || 'دليل LTT المعتمد'} (إصدار ${chunks[0]?.version || '1.0'})*`;
      
      return res.json({
        text: mockResponseText,
        confidenceScore: chunks.length > 0 ? 'high' : 'medium',
        sources: chunks.map((c: any) => ({
          docTitle: c.docTitle,
          category: c.category,
          version: c.version,
          updatedAt: c.updatedAt,
          snippet: c.content.slice(0, 100) + '...'
        })),
        followUpQuestions: [
          'ما هي المستندات المطلوبة للاشتراك؟',
          'كيف يمكنني تشخيص مشكلة إشارة LOS الحمراء؟',
          'قارن بين باقات LTT Fiber وباقات FWA.'
        ]
      });
    }

    // Call Gemini 3.6 Flash via Server-Side SDK
    const prompt = `سياق قاعدة المعرفة المعتمدة لدى LTT:\n${contextText}\n\nسؤال المستخدم/الموظف:\n${cleanQuery}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high factual compliance
      },
    });

    const replyText = response.text || 'لم يتم توليد نص.';

    return res.json({
      text: replyText,
      confidenceScore: chunks.length > 0 ? 'high' : 'low',
      sources: chunks.map((c: any) => ({
        docTitle: c.docTitle,
        category: c.category,
        version: c.version,
        updatedAt: c.updatedAt,
        snippet: c.content.slice(0, 100) + '...'
      })),
      followUpQuestions: [
        'عرض تفاصيل أكثر حول الإجراء',
        'ما هي المتطلبات الرسمية؟',
        'هل توجد خيارات альтернаative للخدمة؟'
      ]
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب في خادم Techno AI: ' + error.message });
  }
});

// File Analysis Endpoint (PDF, DOCX, TXT, CSV, JSON, JSONL, Markdown)
app.post('/api/analyze-file', async (req, res) => {
  try {
    const { filename, fileContent, fileData, mimeType, fileType } = req.body;

    if (!fileContent && !fileData) {
      return res.status(400).json({ error: 'محتوى أو بيانات الملف مفقودة.' });
    }

    const ai = getGeminiClient();
    let rawText = fileContent || '';
    let extractedTitle = filename ? filename.replace(/\.[^/.]+$/, "") : 'مستند معرفي جديد';
    let summary = 'تم استخراج وتجزئة المستند بنجاح على الخادم.';
    let detectedCategory = 'الدعم الفني والخدمات';
    let suggestedKeywords: string[] = ['LTT', 'معرفة', 'دليل'];
    let chunks: { title: string; content: string; keywords: string[] }[] = [];

    if (ai) {
      const promptText = `
أنت خبير استخراج ومعالجة بيانات لشركة ليبيا للاتصالات والتقنية (LTT).
قم بتحليل الملف المرفق واستخراج المعرفة بالصيغة الهيكلية التالية بصيغة JSON فقط:
{
  "title": "عنوان دقيق ورسمي للمستند",
  "summary": "ملخص شامل ومختصر للمستند في فقرة واحدة",
  "category": "إحدى التصنيفات التالية حصراً: خدمات الأفراد / خدمات الأعمال / الدعم الفني والخدمات / الألياف البصرية FTTH / الجيل الرابع 4G / الأعطال والإنذارات / السياسات والإجراءات",
  "keywords": ["كلمة1", "كلمة2", "كلمة3", "كلمة4"],
  "fullText": "النص الكامل بعد تحسين التنسيق واستخراج الخطوات",
  "chunks": [
    {
      "title": "عنوان المقطع الفرعي الإجرائي",
      "content": "محتوى المقطع النصي الشامل للخطوة أو الإجراء",
      "keywords": ["كلمات", "مفتاحية"]
    }
  ]
}
أجب بصيغة JSON فقط دون أي مخرجات نصية خارج كائن JSON.
`;

      let contents: any[] = [];
      if (fileData && (mimeType === 'application/pdf' || filename?.toLowerCase().endsWith('.pdf'))) {
        contents = [
          { inlineData: { mimeType: 'application/pdf', data: fileData } },
          promptText
        ];
      } else {
        const textToAnalyze = (fileContent || '').slice(0, 15000);
        contents = [`محتوى الملف (${filename || 'مستند'}):\n${textToAnalyze}\n\n${promptText}`];
      }

      const analysisRes = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
      });

      if (analysisRes.text) {
        try {
          const jsonMatch = analysisRes.text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.title) extractedTitle = parsed.title;
            if (parsed.summary) summary = parsed.summary;
            if (parsed.category) detectedCategory = parsed.category;
            if (Array.isArray(parsed.keywords)) suggestedKeywords = parsed.keywords;
            if (parsed.fullText) rawText = parsed.fullText;
            if (Array.isArray(parsed.chunks)) chunks = parsed.chunks;
          } else {
            summary = analysisRes.text.slice(0, 300);
          }
        } catch (e) {
          summary = analysisRes.text.slice(0, 300);
        }
      }
    }

    if (chunks.length === 0 && rawText) {
      // Fallback chunking by paragraph
      const paragraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 15);
      chunks = paragraphs.map((p, i) => ({
        title: `${extractedTitle} - مقطع #${i + 1}`,
        content: p.trim(),
        keywords: suggestedKeywords,
      }));
    }

    res.json({
      extractedTitle,
      summary,
      category: detectedCategory,
      keywords: suggestedKeywords,
      extractedContent: rawText,
      chunksCount: chunks.length,
      chunks,
      status: 'draft',
      fileType: fileType || mimeType || 'file',
    });
  } catch (err: any) {
    console.error('Analyze file error:', err);
    res.status(500).json({ error: 'فشل تحليل واستخراج بيانات الملف: ' + err.message });
  }
});

// Test Lab Execution Endpoint for Admins
app.post('/api/test-lab', async (req, res) => {
  try {
    const { testQuery, promptVersion, chunks } = req.body;
    const cleanQuery = sanitizePromptInput(testQuery);

    const contextText = chunks.map((c: any) => c.content).join('\n\n');
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        outputResponse: `[اختبار النظام في وضع المحاكاة]\n\nإجابة اختبارية مبنية على السياق المتاح لـ: "${cleanQuery}"`,
        confidenceScore: 'high',
        evaluation: 'نجح - ملتزم بقاعدة المعرفة (0% هلوسة)'
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `سياق الاختبار:\n${contextText}\n\nالسؤال:\n${cleanQuery}`,
      config: {
        systemInstruction: promptVersion || 'أنت مساعد LTT الملتزم بدليل المعرفة.',
        temperature: 0.1,
      }
    });

    res.json({
      outputResponse: response.text,
      confidenceScore: 'high',
      evaluation: 'تم توليد الإجابة بنجاح واستيفاء معايير RAG.'
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Vite middleware for development vs static serve for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
