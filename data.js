// 1. Exam Routine Data
const examRoutine = [
    { date: "2026-11-19", bnDate: "১৯-১১-২০২৬", day: "বৃহস্পতিবার", subject: "বাংলা ১ম পত্র" },
    { date: "2026-11-23", bnDate: "২৩-১১-২০২৬", day: "সোমবার", subject: "সাধারণ বিজ্ঞান" },
    { date: "2026-11-25", bnDate: "২৫-১১-২০২৬", day: "বুধবার", subject: "বাংলাদেশ ও বিশ্বপরিচয়" },
    { date: "2026-11-29", bnDate: "২৯-১১-২০২৬", day: "রবিবার", subject: "ইসলাম শিক্ষা (ধর্ম)" },
    { date: "2026-12-01", bnDate: "০১-১২-২০২৬", day: "মঙ্গলবার", subject: "গণিত" },
    { date: "2026-12-03", bnDate: "০৩-১২-২০২৬", day: "বৃহস্পতিবার", subject: "English 1st Paper" },
    { date: "2026-12-07", bnDate: "০৭-১২-২০২৬", day: "সোমবার", subject: "English 2nd Paper" },
    { date: "2026-12-09", bnDate: "০৯-১২-২০২৬", day: "বুধবার", subject: "বাংলা ২য় পত্র" },
    { date: "2026-12-17", bnDate: "১৭-১২-২০২৬", day: "বৃহস্পতিবার", subject: "তথ্য ও যোগাযোগ প্রযুক্তি" }
];

// 2. Daily Schedule Map (Combining Exams + Revision Plan)
const dailySchedule = {
    "2026-11-14": { type: "study", short: "বাংলা ২য়", title: "বাংলা ২য় পত্র অগ্রিম প্রস্তুতি", desc: "রচনা ও অনুচ্ছেদ/সারাংশ-সারমর্মগুলো আগে থেকেই গুছিয়ে পড়া শুরু করা।" },
    "2026-11-16": { type: "study", short: "বাংলা ১ম", title: "বাংলা ১ম পত্র - আনন্দ পাঠ (রাত)", desc: "আনন্দ পাঠের ৪টি গল্প ভালোভাবে রিভিশন দেওয়া ও মূলভাব ঝালাই করা।" },
    "2026-11-17": { type: "study", short: "বাংলা ১ম", title: "বাংলা ১ম পত্র চূড়ান্ত রিভিশন", desc: "গদ্য, পদ্য ও আনন্দ পাঠের সৃজনশীল ও বহুনির্বাচনি প্রশ্ন রিভিশন।" },
    "2026-11-18": { type: "study", short: "বাংলা ১ম", title: "বাংলা ১ম পত্র ফাইনাল টাচ", desc: "আগামীকাল পরীক্ষার জন্য সম্পূর্ণ রিভিশন ও প্রয়োজনীয় জিনিসপত্র গুছিয়ে রাখা।" },
    "2026-11-19": { type: "exam", short: "পরীক্ষা: বাংলা ১ম", title: "পরীক্ষা: বাংলা ১ম পত্র + বিজ্ঞান শুরু", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। বিকেলে বিশ্রাম নিয়ে সাধারণ বিজ্ঞান (অধ্যায় ৩, ৪) শুরু।" },
    "2026-11-20": { type: "study", short: "বিজ্ঞান", title: "সাধারণ বিজ্ঞান রিভিশন (দিন ২)", desc: "অধ্যায় ৮ (শব্দের কথা) ও অধ্যায় ৯ (তাপ ও তাপমাত্রা) পড়া ও চিত্র অনুশীলন।" },
    "2026-11-21": { type: "study", short: "বিজ্ঞান", title: "সাধারণ বিজ্ঞান রিভিশন (দিন ৩)", desc: "অধ্যায় ১০ (বিদ্যুৎ ও চুম্বকের ঘটনা) ও অধ্যায় ১৩ (প্রাকৃতিক পরিবেশ ও দূষণ) শেষ করা।" },
    "2026-11-22": { type: "study", short: "বিজ্ঞান শেষ", title: "সাধারণ বিজ্ঞান সম্পূর্ণ রিভিশন শেষ", desc: "অধ্যায় ১৪ (জলবায়ু পরিবর্তন) শেষ করে পুরো বইয়ের সৃজনশীল ও MCQ রিভিশন।" },
    "2026-11-23": { type: "exam", short: "পরীক্ষা: বিজ্ঞান", title: "পরীক্ষা: সাধারণ বিজ্ঞান + সমাজ শুরু", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। বিকেলে বাংলাদেশ ও বিশ্বপরিচয় (অধ্যায় ২, ৩, ৫) পড়া।" },
    "2026-11-24": { type: "study", short: "সমাজ শেষ", title: "বাংলাদেশ ও বিশ্বপরিচয় সম্পূর্ণ শেষ", desc: "অধ্যায় ৭, ৯ ও ১০ শেষ করে পুরো বইয়ের রিভিশন কমপ্লিট করা।" },
    "2026-11-25": { type: "exam", short: "পরীক্ষা: সমাজ", title: "পরীক্ষা: বাওবি + গণিত রাতের সেশন", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। রাতে গণিত (পাটিগণিত ২.২, ২.৩, ৩) প্র্যাকটিস।" },
    "2026-11-26": { type: "study", short: "গণিত", title: "গণিত অগ্রিম প্র্যাকটিস", desc: "বীজগণিত (৫.৩, ৫.৪, ৬.২) ও জ্যামিতির উপপাদ্যগুলো ঝালাই করে নেওয়া।" },
    "2026-11-27": { type: "study", short: "ধর্ম", title: "ইসলাম শিক্ষা রিভিশন (দিন ১)", desc: "১ম অধ্যায় (আকাইদ), ২য় অধ্যায় (ইবাদত) ও ৩য় অধ্যায় (কুরআন ও হাদিস) পড়া।" },
    "2026-11-28": { type: "study", short: "ধর্ম শেষ", title: "ইসলাম শিক্ষা সম্পূর্ণ শেষ", desc: "৪র্থ অধ্যায় (আখলাখ) ও ৫ম অধ্যায় (আদর্শ জীবন চরিত) শেষ করে পূর্ণাঙ্গ রিভিশন।" },
    "2026-11-29": { type: "exam", short: "পরীক্ষা: ধর্ম", title: "পরীক্ষা: ইসলাম শিক্ষা + গণিত মিশন", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। বিকেল ও রাতে গণিত বীজগণিত (৭.২, ৭.৩) ও তথ্য-উপাত্ত (১১ অধ্যায়) শেষ করা।" },
    "2026-11-30": { type: "study", short: "গণিত শেষ", title: "গণিত চূড়ান্ত রিভিশন", desc: "জ্যামিতি ১০ম অধ্যায় (উপপাদ্য ১-৫, সম্পাদ্য ৪-৬, অনুশীলনী ৯.৩, ১০.১-১০.৩) ও ষাণ্মাসিক পুনরালোচনা।" },
    "2026-12-01": { type: "exam", short: "পরীক্ষা: গণিত", title: "পরীক্ষা: গণিত + English 1st মডেল রিভিশন", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। বিকেলে English 1st Paper (Unit 6-9 Reading ও Paragraph) শুরু।" },
    "2026-12-02": { type: "study", short: "Eng 1st শেষ", title: "English 1st Paper মডেল রিভিশন শেষ", desc: "সবগুলো Paragraph (a-f) এবং ৫টি Dialogue ভালোভাবে মুখস্থ ও লিখে প্র্যাকটিস।" },
    "2026-12-03": { type: "exam", short: "পরীক্ষা: Eng 1st", title: "পরীক্ষা: English 1st + Eng 2nd Composition", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। বিকেলে English 2nd Paper-এর বাকি ৩টি Composition পড়া।" },
    "2026-12-04": { type: "study", short: "Eng 2nd", title: "English 2nd: Composition ও Grammar", desc: "৫টি Composition (Value of Time, Season, Duties, Journey by Boat, Tree Plantation) শেষ করা ও Tense/Right form of verb দেখা।" },
    "2026-12-05": { type: "study", short: "Eng 2nd", title: "English 2nd: Grammar প্র্যাকটিস", desc: "Voice change, Narration, Preposition, Articles ও Conjunction অনুশীলন।" },
    "2026-12-06": { type: "study", short: "Eng 2nd শেষ", title: "English 2nd চূড়ান্ত রিভিশন", desc: "Conversion of sentences, Conditionals, Common Errors ও সব Composition রিভিশন।" },
    "2026-12-07": { type: "exam", short: "পরীক্ষা: Eng 2nd", title: "পরীক্ষা: English 2nd + বাংলা ২য় রচনা", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। বিকেলে বাংলা ২য় পত্রের ৫টি প্রবন্ধ রচনা রিভিশন।" },
    "2026-12-08": { type: "study", short: "বাংলা ২য় শেষ", title: "বাংলা ২য় পত্র সম্পূর্ণ রিভিশন", desc: "৫টি সারাংশ/সারমর্ম, অনুধাবন পরীক্ষণ এবং ব্যাকরণ (বাক্য, বিরামচিহ্ন, বাগধারা, এক কথায় প্রকাশ) শেষ করা।" },
    "2026-12-09": { type: "exam", short: "পরীক্ষা: বাংলা ২য়", title: "পরীক্ষা: বাংলা ২য় পত্র", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। আজকের পর বড় একটা বিরতি ও নানু বাড়ী ভ্রমণ!" },
    "2026-12-10": { type: "travel", short: "নানু বাড়ী + ICT", title: "নানু বাড়ী + হালকা ICT রিভিশন", desc: "আনন্দের পাশাপাশি প্রতিদিন ১ ঘণ্টা তথ্য ও যোগাযোগ প্রযুক্তি (২য় অধ্যায়) চোখ বুলানো।" },
    "2026-12-11": { type: "travel", short: "নানু বাড়ী + ICT", title: "নানু বাড়ী + ICT ৪র্থ অধ্যায়", desc: "ওয়ার্ড প্রসেসিং (৪র্থ অধ্যায়) রিভিশন ও গুরুত্বপূর্ণ MCQ দেখা।" },
    "2026-12-12": { type: "travel", short: "নানু বাড়ী + ICT", title: "নানু বাড়ী + ICT ৫ম অধ্যায়", desc: "শিক্ষায় ইন্টারনেট ব্যবহার (৫ম অধ্যায়) রিভিশন।" },
    "2026-12-13": { type: "travel", short: "নানু বাড়ী + ICT", title: "নানু বাড়ী + ICT প্রশ্ন অনুশীলন", desc: "২য়, ৪র্থ ও ৫ম অধ্যায়ের সংক্ষিপ্ত প্রশ্ন ও MCQ প্র্যাকটিস।" },
    "2026-12-14": { type: "travel", short: "নানু বাড়ী + ICT", title: "নানু বাড়ী + ICT রিভিশন", desc: "পুরো বইয়ের গুরুত্বপূর্ণ পয়েন্টগুলো একবার রিভিশন দেওয়া।" },
    "2026-12-15": { type: "study", short: "ICT রিভিশন", title: "তথ্য ও যোগাযোগ প্রযুক্তি ফাইনাল রিভিশন", desc: "২য়, ৪র্থ ও ৫ম অধ্যায়ের পূর্ণাঙ্গ মডেল টেস্ট ও MCQ ঝালাই।" },
    "2026-12-16": { type: "study", short: "ICT প্রস্তুতি", title: "শেষ পরীক্ষার চূড়ান্ত প্রস্তুতি", desc: "আগামীকাল শেষ পরীক্ষা! ICT পুরো সিলেবাস রিভিশন।" },
    "2026-12-17": { type: "exam", short: "শেষ পরীক্ষা: ICT", title: "শেষ পরীক্ষা: তথ্য ও যোগাযোগ প্রযুক্তি", desc: "সকাল ৯:০০ - ১১:৩০ পরীক্ষা। পরীক্ষা শেষেই বার্ষিক পরীক্ষার ছুটি শুরু! 🎉" }
};

// 3. Revision Checklist Items
const revisionTasks = [
    { id: "rev1", date: "১৬/১১/২০২৬ (রাত)", subject: "বাংলা ১ম পত্র", detail: "আনন্দ পাঠ (৪টি গল্প) ও মূল পাঠ্যবই রিভিশন" },
    { id: "rev2", date: "১৯/১১ - ২২/১১/২০২৬", subject: "সাধারণ বিজ্ঞান", detail: "অধ্যায় ৩, ৪, ৮, ৯, ১০, ১৩ ও ১৪ সম্পূর্ণ শেষ করা" },
    { id: "rev3", date: "২৩/১১ - ২৪/১১/২০২৬", subject: "বাংলাদেশ ও বিশ্বপরিচয়", detail: "অধ্যায় ২, ৩, ৫, ৭, ৯ ও ১০ (পাঠ পুনরালোচনা) শেষ করা" },
    { id: "rev4", date: "২৫/১১ - ২৬/১১ (রাত)", subject: "গণিত (পর্ব ১)", detail: "পাটিগণিত (২.২, ২.৩, ৩) ও বীজগণিতের প্রাথমিক অনুশীলন" },
    { id: "rev5", date: "২৭/১১ - ২৮/১১/২০২৬", subject: "ইসলাম শিক্ষা (ধর্ম)", detail: "১ম থেকে ৫ম অধ্যায়ের নির্ধারিত পাঠগুলো সম্পূর্ণ শেষ করা" },
    { id: "rev6", date: "২৯/১১ - ৩০/১১/২০২৬", subject: "গণিত (পর্ব ২ - চূড়ান্ত)", detail: "বীজগণিত (৫.৩-৭.৩), জ্যামিতি (১০ম অধ্যায়) ও তথ্য-উপাত্ত (১১ অধ্যায়) শেষ করা" },
    { id: "rev7", date: "০১/১২ - ০২/১২/২০২৬", subject: "ইংরেজি ১ম পত্র", detail: "মডেল রিভিশন: Unit 6-9 Reading, ৬টি Paragraph ও ৫টি Dialogue" },
    { id: "rev8", date: "০৩/১২ - ০৬/১২/২০২৬", subject: "ইংরেজি ২য় পত্র", detail: "বাকি ৩টি Composition শেষ করা + ১২টি Grammar টপিক রিভিশন" },
    { id: "rev9", date: "০৭/১২ - ০৮/১২/২০২৬", subject: "বাংলা ২য় পত্র", detail: "৫টি প্রবন্ধ রচনা, ৫টি সারাংশ/সারমর্ম ও ব্যাকরণ অংশ শেষ করা" },
    { id: "rev10", date: "১০/১২ - ১৫/১২/২০২৬", subject: "তথ্য ও যোগাযোগ প্রযুক্তি", detail: "নানু বাড়ী ভ্রমণের ফাঁকে অধ্যায় ২, ৪ ও ৫ রিভিশন শেষ করা" }
];

// 4. Syllabus Data
const syllabusData = [
    {
        title: "১. বাংলা ২য় পত্র",
        excluded: "ভাবসম্প্রসারণ ও পত্র বাদে",
        content: `
            <strong>ব্যাকরণ অংশ:</strong>
            <ul>
                <li>বাক্য, বিরামচিহ্ন, বানান, শব্দার্থ, একই শব্দের বিভিন্ন অর্থের প্রয়োগ</li>
                <li>বিপরীতার্থক শব্দ দিয়ে বাক্য রচনা, সমোচ্চারিত ভিন্নার্থক শব্দ দিয়ে বাক্য রচনা</li>
                <li>এক কথায় প্রকাশ, বাগধারা</li>
            </ul>
            <strong>নির্মিতি অংশ:</strong>
            <ul>
                <li><strong>অনুধাবন পরীক্ষণ (শ্রেণি উপযোগী):</strong> বিষয়ভিত্তিক শিক্ষক কর্তৃক নির্দেশনা।</li>
                <li><strong>সারাংশ/সারমর্ম (৫টি):</strong>
                    <br>১। আসিতেছে শুভ দিন .................. নব উত্থান।
                    <br>২। বিপদে মোরে রক্ষা কর ................... যেন মানি ক্ষয়।
                    <br>৩। অপরের জন্য তুমি প্রাণ ................. গৌরব বোধ করে।
                    <br>৪। নদী কভু পান নাহি করে ............... পরহিত তরে।
                    <br>৫। তুমি জীবনকে সার্থক ও সুন্দর ........... হইয়া উঠিবে।
                </li>
                <li><strong>প্রবন্ধ রচনা (৫টি):</strong> (১) শহীদ মিনার, (২) টেলিভিশন, (৩) শৃঙ্খলাবোধ, (৪) কি ধরণের বই আমার পড়তে ভাল লাগে, (৫) আমার চারপাশের প্রকৃতি।</li>
            </ul>
        `
    },
    {
        title: "২. English 1st Paper",
        excluded: "Completing Story বাদে",
        content: `
            <strong>Part-'A' (Reading):</strong>
            <ul><li>Unit: Six to Nine (Unit 6 - 9)</li></ul>
            <strong>Part-'B' (Writing):</strong>
            <ul>
                <li><strong>Paragraph (6):</strong> (a) A Book Fair, (b) Your Favourite Game, (c) My Village, (d) Your School Library, (e) Climate Change, (f) Environment Pollution.</li>
                <li><strong>Completing Dialogue (5):</strong>
                    <br>(a) Importance of tree plantation (You & Friend)
                    <br>(b) Favourite Sports (Two Friends)
                    <br>(c) Advantages & disadvantages of village life and city life
                    <br>(d) Liking / Disliking (Two friends)
                    <br>(e) Weather and climate change (You, Your sister & Your uncle)
                </li>
            </ul>
        `
    },
    {
        title: "৩. English 2nd Paper",
        excluded: "Informal Letter ও E-mail বাদে",
        content: `
            <strong>Part-'A' (Grammar Test):</strong>
            <ul>
                <li>The Sentences, Parts of Speech, Articles, Tense, Use of the Right form of the Verb, Voice change, Preposition, Correction / Common Errors, Conjunction, Conversion of sentences, Narration, Conditionals.</li>
            </ul>
            <strong>Part-'B' (Writing Test - Compositions):</strong>
            <ul>
                <li>(a) The Value of Time</li>
                <li>(b) The Season You Like Most</li>
                <li>(c) Duties of a Student</li>
                <li>(d) A Journey by Boat</li>
                <li>(e) Tree Plantation</li>
            </ul>
        `
    },
    {
        title: "৪. গণিত (সম্পূর্ণ বার্ষিক সিলেবাস)",
        excluded: "",
        content: `
            <ul>
                <li><strong>পাটিগণিত:</strong> অনুশীলনী- ২.২, ২.৩, ৩ এবং ষাণ্মাসিক পরীক্ষার পুনরালোচনা।</li>
                <li><strong>বীজগণিত:</strong> অনুশীলনী- ৫.৩, ৫.৪, ৬.২, ৭.২ ও ৭.৩ সহ ষাণ্মাসিক পরীক্ষার পুনরালোচনা।</li>
                <li><strong>জ্যামিতি (১০ম অধ্যায়):</strong>
                    <br>• উপপাদ্য: ত্রিভুজ সংক্রান্ত উপপাদ্য- ১, ২, ৩, ৪ ও ৫।
                    <br>• সম্পাদ্য: ত্রিভুজ সংক্রান্ত- ৪, ৫ ও ৬।
                    <br>• অনুশীলনী: ৯.৩, ১০.১, ১০.২ ও ১০.৩।
                </li>
                <li><strong>তথ্য উপাত্ত:</strong> ১১ অধ্যায়।</li>
            </ul>
            <p style="color:#b45309; font-size:0.85rem;"><em>বিঃ দ্রঃ ষাণ্মাসিক পরীক্ষার পুনরালোচনাসহ বার্ষিক পরীক্ষার প্রশ্নপত্র প্রণয়ন করা হবে।</em></p>
        `
    },
    {
        title: "৫. বাংলাদেশ ও বিশ্বপরিচয়",
        excluded: "",
        content: `
            <ul>
                <li><strong>দ্বিতীয় অধ্যায়:</strong> বাংলাদেশের সংস্কৃতি ও সাংস্কৃতিক বৈচিত্র।</li>
                <li><strong>তৃতীয় অধ্যায়:</strong> পরিবারে শিশুর বেড়ে ওঠা।</li>
                <li><strong>পঞ্চম অধ্যায়:</strong> বাংলাদেশ ও বাংলাদেশের নাগরিক।</li>
                <li><strong>সপ্তম অধ্যায়:</strong> বাংলাদেশের জনসংখ্যা পরিচিতি।</li>
                <li><strong>নবম অধ্যায়:</strong> বাংলাদেশের প্রবীণ ব্যক্তি ও নারী অধিকার।</li>
                <li><strong>দশম অধ্যায়:</strong> এশিয়ার কয়েকটি দেশ। (পাঠ পুনরালোচনা)</li>
            </ul>
        `
    },
    {
        title: "৬. সাধারণ বিজ্ঞান",
        excluded: "",
        content: `
            <ul>
                <li><strong>৩য় অধ্যায়:</strong> উদ্ভিদের বাহ্যিক বৈশিষ্ট্য।</li>
                <li><strong>৪র্থ অধ্যায়:</strong> শ্বসন।</li>
                <li><strong>৮ম অধ্যায়:</strong> শব্দের কথা।</li>
                <li><strong>৯ম অধ্যায়:</strong> তাপ ও তাপমাত্রা।</li>
                <li><strong>১০ম অধ্যায়:</strong> বিদ্যুৎ ও চুম্বকের ঘটনা।</li>
                <li><strong>১৩শ অধ্যায়:</strong> প্রাকৃতিক পরিবেশ ও দূষণ।</li>
                <li><strong>১৪শ অধ্যায়:</strong> জলবায়ু পরিবর্তন।</li>
            </ul>
        `
    },
    {
        title: "৭. ইসলাম শিক্ষা",
        excluded: "",
        content: `
            <ul>
                <li><strong>১ম অধ্যায় (আকাইদ):</strong> পাঠ ৬ষ্ঠ থেকে পাঠ ৯ম পর্যন্ত।</li>
                <li><strong>২য় অধ্যায় (ইবাদত):</strong> পাঠ ৬ষ্ঠ থেকে পাঠ ১০ম পর্যন্ত।</li>
                <li><strong>৩য় অধ্যায় (কুরআন ও হাদিস শিক্ষা):</strong> পাঠ ৮ম থেকে পাঠ ১৪শ পর্যন্ত।</li>
                <li><strong>৪র্থ অধ্যায় (আখলাখ):</strong> পাঠ ৯ম থেকে পাঠ ১৫শ পর্যন্ত।</li>
                <li><strong>৫ম অধ্যায় (আদর্শ জীবন চরিত):</strong> পাঠ ৫ম থেকে পাঠ ৭ম পর্যন্ত।</li>
            </ul>
        `
    },
    {
        title: "৮. তথ্য ও যোগাযোগ প্রযুক্তি",
        excluded: "",
        content: `
            <ul>
                <li><strong>২য় অধ্যায়:</strong> কম্পিউটার সংশ্লিষ্ট যন্ত্রপাতি। (পাঠ পুনরালোচনা)</li>
                <li><strong>৪র্থ অধ্যায়:</strong> ওয়ার্ড প্রসেসিং।</li>
                <li><strong>৫ম অধ্যায়:</strong> শিক্ষায় ইন্টারনেট ব্যবহার।</li>
            </ul>
        `
    }
];

