/**
 * Screening Report Generator
 *
 * Usage: node create-report.js <input.json> <output.docx>
 *
 * Input JSON:
 * {
 *   "programName": "Program 2026",
 *   "orgName": "Organization Name",
 *   "screeningDate": "2026-04-21",
 *   "language": "en",
 *   "totalApplications": 43,
 *   "flags": [
 *     {
 *       "name": "Full Name",
 *       "level": "red" | "yellow",
 *       "email": "...",
 *       "messenger": "...",
 *       "location": "...",
 *       "age": "...",
 *       "reasons": ["reason 1", "reason 2"],
 *       "osintResults": "What was found / not found online",
 *       "motivationMatch": "Similar to applicant X (details)" | null,
 *       "crossReference": "Prior applications info" | null,
 *       "priorScreening": "Prior screening history" | null
 *     }
 *   ],
 *   "methodology": "Brief description"
 * }
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, ShadingType, Header
} = require("docx");

// i18n labels
const L = {
  en: {
    confidential: "CONFIDENTIAL", title: "Application Screening",
    date: "Screening date", total: "Total applications",
    redFlags: "Red flags", yellowFlags: "Yellow flags",
    summary: "Summary", detailed: "Detailed Analysis",
    flag: "Flag", name: "Name", factors: "Key Risk Factors",
    flagLevel: "Flag level", red: "RED", yellow: "YELLOW",
    reasons: "Reasons", osint: "Online verification",
    motivation: "Motivation cross-comparison", crossRef: "Cross-reference",
    priorScreening: "Prior screening", methodology: "Methodology",
    disclaimer: "Disclaimer",
    disclaimerText: "This document is an automated pre-screening aid. Final admission decisions rest with the selection team. Automated screening does not replace expert judgment — it highlights applications requiring additional attention.",
    defaultMethodology: "Automated pre-screening based on cross-field validation, motivation text analysis, digital footprint assessment, duplicate detection, OSINT verification, motivation cross-comparison, and historical cross-reference."
  },
  ru: {
    confidential: "КОНФИДЕНЦИАЛЬНО", title: "Скрининг заявок",
    date: "Дата скрининга", total: "Всего заявок",
    redFlags: "Красных флагов", yellowFlags: "Жёлтых флагов",
    summary: "Сводная таблица", detailed: "Детальный анализ",
    flag: "Флаг", name: "Имя", factors: "Ключевые факторы риска",
    flagLevel: "Уровень флага", red: "КРАСНЫЙ", yellow: "ЖЁЛТЫЙ",
    reasons: "Причины", osint: "Онлайн-верификация",
    motivation: "Кросс-сравнение мотиваций", crossRef: "Кросс-проверка",
    priorScreening: "Предыдущий скрининг", methodology: "Методология",
    disclaimer: "Примечание",
    disclaimerText: "Этот документ является результатом автоматизированного пре-скрининга и носит рекомендательный характер. Окончательные решения о допуске принимает команда отбора. Автоматизированный скрининг не заменяет экспертную оценку — он помогает выделить заявки, требующие дополнительного внимания.",
    defaultMethodology: "Автоматизированный пре-скрининг на основе кросс-валидации полей, анализа мотивационного текста, оценки цифрового следа, выявления дублей, OSINT-верификации, кросс-сравнения мотиваций и проверки по историческим данным."
  },
  be: {
    confidential: "КАНФІДЭНЦЫЙНА", title: "Скрынінг заявак",
    date: "Дата скрынінгу", total: "Усяго заявак",
    redFlags: "Чырвоных флагаў", yellowFlags: "Жоўтых флагаў",
    summary: "Зводная табліца", detailed: "Дэталёвы аналіз",
    flag: "Флаг", name: "Імя", factors: "Ключавыя фактары рызыкі",
    flagLevel: "Узровень флагу", red: "ЧЫРВОНЫ", yellow: "ЖОЎТЫ",
    reasons: "Прычыны", osint: "Анлайн-верыфікацыя",
    motivation: "Крос-параўнанне матывацый", crossRef: "Крос-праверка",
    priorScreening: "Папярэдні скрынінг", methodology: "Метадалогія",
    disclaimer: "Заўвага",
    disclaimerText: "Гэты дакумент з'яўляецца вынікам аўтаматызаванага прэ-скрынінгу і носіць рэкамендацыйны характар. Канчатковыя рашэнні аб дапуску прымае каманда адбору. Аўтаматызаваны скрынінг не замяняе экспертную ацэнку — ён дапамагае вылучыць заяўкі, якія патрабуюць дадатковай увагі.",
    defaultMethodology: "Аўтаматызаваны прэ-скрынінг на аснове крос-валідацыі палёў, аналізу матывацыйнага тэксту, ацэнкі лічбавага следу, выяўлення дублікатаў, OSINT-верыфікацыі, крос-параўнання матывацый і праверкі па гістарычных дадзеных."
  },
  uk: {
    confidential: "КОНФІДЕНЦІЙНО", title: "Скринінг заявок",
    date: "Дата скринінгу", total: "Всього заявок",
    redFlags: "Червоних прапорів", yellowFlags: "Жовтих прапорів",
    summary: "Зведена таблиця", detailed: "Детальний аналіз",
    flag: "Прапор", name: "Ім'я", factors: "Ключові фактори ризику",
    flagLevel: "Рівень прапору", red: "ЧЕРВОНИЙ", yellow: "ЖОВТИЙ",
    reasons: "Причини", osint: "Онлайн-верифікація",
    motivation: "Крос-порівняння мотивацій", crossRef: "Крос-перевірка",
    priorScreening: "Попередній скринінг", methodology: "Методологія",
    disclaimer: "Примітка",
    disclaimerText: "Цей документ є результатом автоматизованого пре-скринінгу та має рекомендаційний характер. Остаточні рішення про допуск приймає команда відбору.",
    defaultMethodology: "Автоматизований пре-скринінг на основі крос-валідації полів, аналізу мотиваційного тексту, оцінки цифрового сліду, виявлення дублів, OSINT-верифікації та крос-порівняння мотивацій."
  }
};

async function createReport(inputPath, outputPath) {
  const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const t = L[data.language] || L.en;

  const redFlags = data.flags.filter(f => f.level === "red");
  const yellowFlags = data.flags.filter(f => f.level === "yellow");

  function flagCell(level) {
    const color = level === "red" ? "FF4444" : "FFB020";
    const label = level === "red" ? t.red : t.yellow;
    return new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: label, bold: true, color: "FFFFFF", font: "Arial", size: 20 })],
        alignment: AlignmentType.CENTER
      })],
      shading: { type: ShadingType.CLEAR, fill: color },
      verticalAlign: "center",
      width: { size: 15, type: WidthType.PERCENTAGE }
    });
  }

  function textCell(text, width, bold = false) {
    return new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: text || "—", font: "Arial", size: 20, bold })],
      })],
      width: { size: width, type: WidthType.PERCENTAGE }
    });
  }

  const tableRows = [
    new TableRow({
      children: [textCell(t.flag, 15, true), textCell(t.name, 30, true), textCell(t.factors, 55, true)],
      tableHeader: true,
    }),
    ...data.flags.map(f => new TableRow({
      children: [flagCell(f.level), textCell(f.name, 30), textCell(f.reasons.join("; "), 55)]
    }))
  ];

  const detailedSections = [];
  data.flags.forEach((f, i) => {
    const levelLabel = f.level === "red" ? t.red : t.yellow;
    detailedSections.push(
      new Paragraph({
        children: [new TextRun({ text: `${i + 1}. ${f.name}`, font: "Arial", size: 24, bold: true })],
        heading: HeadingLevel.HEADING_3, spacing: { before: 300, after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `${t.flagLevel}: `, font: "Arial", size: 20 }),
          new TextRun({ text: levelLabel, font: "Arial", size: 20, bold: true,
            color: f.level === "red" ? "CC0000" : "CC8800" }),
        ],
        spacing: { after: 60 }
      })
    );

    const contactParts = [];
    if (f.email) contactParts.push(`Email: ${f.email}`);
    if (f.messenger) contactParts.push(`Messenger: ${f.messenger}`);
    if (f.location) contactParts.push(`${t.name}: ${f.location}`);
    if (f.age) contactParts.push(`Age: ${f.age}`);
    if (contactParts.length > 0) {
      detailedSections.push(new Paragraph({
        children: [new TextRun({ text: contactParts.join(" | "), font: "Arial", size: 20, italics: true, color: "555555" })],
        spacing: { after: 100 }
      }));
    }

    // Reasons
    detailedSections.push(new Paragraph({
      children: [new TextRun({ text: `${t.reasons}:`, font: "Arial", size: 20, bold: true })],
      spacing: { after: 60 }
    }));
    f.reasons.forEach(r => {
      detailedSections.push(new Paragraph({
        children: [new TextRun({ text: `• ${r}`, font: "Arial", size: 20 })],
        spacing: { after: 40 }
      }));
    });

    // OSINT
    if (f.osintResults) {
      detailedSections.push(
        new Paragraph({ children: [new TextRun({ text: `${t.osint}:`, font: "Arial", size: 20, bold: true })], spacing: { before: 100, after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: f.osintResults, font: "Arial", size: 20 })], spacing: { after: 60 } })
      );
    }

    // Motivation cross-comparison
    if (f.motivationMatch) {
      detailedSections.push(
        new Paragraph({ children: [new TextRun({ text: `${t.motivation}:`, font: "Arial", size: 20, bold: true })], spacing: { before: 100, after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: f.motivationMatch, font: "Arial", size: 20 })], spacing: { after: 60 } })
      );
    }

    // Cross-reference
    if (f.crossReference) {
      detailedSections.push(
        new Paragraph({ children: [new TextRun({ text: `${t.crossRef}:`, font: "Arial", size: 20, bold: true })], spacing: { before: 100, after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: f.crossReference, font: "Arial", size: 20 })], spacing: { after: 60 } })
      );
    }

    // Prior screening
    if (f.priorScreening) {
      detailedSections.push(
        new Paragraph({ children: [new TextRun({ text: `${t.priorScreening}:`, font: "Arial", size: 20, bold: true })], spacing: { before: 100, after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: f.priorScreening, font: "Arial", size: 20 })], spacing: { after: 60 } })
      );
    }
  });

  const doc = new Document({
    styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
    sections: [{
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [new TextRun({ text: t.confidential, font: "Arial", size: 16, color: "CC0000", bold: true })],
            alignment: AlignmentType.RIGHT
          })]
        })
      },
      children: [
        new Paragraph({ children: [new TextRun({ text: `${t.title}: ${data.programName}`, font: "Arial", size: 32, bold: true })], heading: HeadingLevel.HEADING_1, spacing: { after: 100 } }),
        ...(data.orgName ? [new Paragraph({ children: [new TextRun({ text: data.orgName, font: "Arial", size: 22, color: "666666" })], spacing: { after: 200 } })] : []),
        new Paragraph({ children: [new TextRun({ text: `${t.date}: ${data.screeningDate}`, font: "Arial", size: 20 })], spacing: { after: 60 } }),
        new Paragraph({ children: [new TextRun({ text: `${t.total}: ${data.totalApplications} | ${t.redFlags}: ${redFlags.length} | ${t.yellowFlags}: ${yellowFlags.length}`, font: "Arial", size: 20, bold: true })], spacing: { after: 300 } }),
        new Paragraph({ children: [new TextRun({ text: t.summary, font: "Arial", size: 28, bold: true })], heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
        new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
        new Paragraph({ children: [new TextRun({ text: t.detailed, font: "Arial", size: 28, bold: true })], heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }),
        ...detailedSections,
        new Paragraph({ children: [new TextRun({ text: t.methodology, font: "Arial", size: 28, bold: true })], heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: data.methodology || t.defaultMethodology, font: "Arial", size: 20 })], spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: t.disclaimer, font: "Arial", size: 28, bold: true })], heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: t.disclaimerText, font: "Arial", size: 20, italics: true, color: "666666" })], spacing: { after: 100 } }),
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Report saved to: ${outputPath}`);
}

const args = process.argv.slice(2);
if (args.length < 2) { console.error("Usage: node create-report.js <input.json> <output.docx>"); process.exit(1); }
createReport(args[0], args[1]).catch(err => { console.error("Error:", err); process.exit(1); });
