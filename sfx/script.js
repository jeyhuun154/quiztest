// --- DOM ELEMENTLERİNİ SEÇME ---
const questionText = document.getElementById('question-text');
const answerOptionsContainer = document.getElementById('answer-options');
const progressText = document.getElementById('progress-text');
const appContainer = document.getElementById('app-container');
const backdrop = document.getElementById('backdrop');

// Modallar
const endModal = document.getElementById('end-modal');
const confirmModal = document.getElementById('confirm-modal');
const codeModal = document.getElementById('code-modal');

// Modal Butonları
const endOption1Btn = document.getElementById('end-option-1');
const endOption2Btn = document.getElementById('end-option-2');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');
const codeLinkBtn = document.getElementById('code-link-btn');

// --- SES EFEKTLERİ (İSTEĞE BAĞLI) ---
/*
Not: Bu ses efektlerinin çalışması için 'success.mp3' ve 'fail.mp3' 
adında dosyaların script.js ile aynı klasörde olması gerekir.
Şimdilik bu kodlar yorumda, istersen açarsın.
*/
// const successSound = new Audio('success.mp3');
// const failSound = new Audio('fail.mp3');


// --- SORU BANKASI ---
// !!! BURAYI KENDİNE GÖRE DÜZENLE !!!
const questions = [
    {
        question: "If I keep telling a mod 'youre an embarrassment to your dad' every single day, am I catching a ban?",
        answers: [
            { text: "Nah, Rule 5 says I can roast them", correct: false },
            { text: "Yeah, Rule 5: Roasting is fine but constant abuse is a straight L", correct: true },
            { text: "Mod’s probably a discord kitten anyway, who cares", correct: false },
            { text: "Only if I say it in English", correct: false }
        ]
    },
    {
        question: "What happens if I try to start a 'Skibidi Toilet' fan club in the main chat?",
        answers: [
            { text: "Rule 14: Skibidi spam is a federal crime here. You're getting booted", correct: true },
            { text: "Everyone joins the brainrot", correct: false },
            { text: "You get a custom role called 'Gyatt Master'", correct: false },
            { text: "It's allowed as long as you don't use emojis", correct: false }
        ]
    },
    // Buraya 18 tane daha ekle... Şimdilik kopyalayıp çoğaltıyorum.
    { question: "Why can't I debate which terrorist group has the best 'propaganda aesthetic' in the chat?", answers: [{ text: "Because it's a boring topic", correct: false }, { text: "Because bombs are too loud for the chat", correct: false }, { text: "Rule 1: No terrorism propaganda. We don't 'debate bombs' here", correct: true }, { text: "You have to do it in the <#𝙎𝙐𝙂𝙂𝙀𝙎𝙏𝙄𝙊𝙉𝙎> channel", correct: false }] },
    { question: "If I say 'Your religion is a solid 2/10, mid at best,' which rule am I breaking?", answers: [{ text: "None, it's just a rating", correct: false }, { text: "Rule 9: You should've said it in English", correct: false }, { text: "Rule 13: It's not a slur, so you're chilling", correct: false }, { text: "Rule 2 & 4: Deliberate disrespect and harassment over religion is an instant L", correct: true }] },
    { question: "Can I be racist towards people who aren't on the list in Rule 11?", answers: [{ text: "Yeah, if they ain't on the list, it's fair game", correct: true }, { text: "No, Rule 3 & 13: Don't be a toxic mf and no hate slurs", correct: false }, { text: "Only if you have a custom role", correct: false }, { text: "Racism is allowed on Tuesdays", correct: false }] },
    { question: "What happens if I start yapping toxicly in English in the <#𝙊𝙁𝙁𝙏𝙊𝙋𝙄𝘾> channel?", answers: [{ text: "You get a 'Top Speaker' badge", correct: false }, { text: "Rule 3: 'Don’t be toxic or annoying. Act like a person'", correct: true }, { text: "Everyone thinks you're a genius", correct: false }, { text: "Nothing, the rules don't apply to English speakers", correct: false }] },
    { question: "I found a link that gives 'Free V-Bucks and Nitro,' should I drop it in the chat for the boys?", answers: [{ text: "Yeah, be a legend", correct: false }, { text: "Rule 12: Put it in the self-promo channel", correct: false }, { text: "Rule 7: That phishy scam shit gets you banned", correct: true }, { text: "Only if the mod says it's okay", correct: false }] },
    { question: "Can I make a 'dark humor' joke about pedophilia if it's actually funny?", answers: [{ text: "Rule 15: DO NOT joke about that shit. Ever", correct: true }, { text: "If it hits, it hits", correct: false }, { text: "Only if you're a mod", correct: false }, { text: "Rule 13: It's just casual profanity", correct: false }] },
    { question: "I want 10 custom roles because I'm 'built different.' How many can I actually get?", answers: [{ text: "As many as you can handle", correct: false }, { text: "Zero, roles are for winners", correct: false }, { text: "5, but you have to pay the mods", correct: false }, { text: "Rule 8: Just one. Keep it reasonable and don't be a glazer", correct: true }] },
    { question: "If someone tells me 'Stop being a toxic NPC and act like a human,' what rule are they referencing?", answers: [{ text: "Rule 1", correct: false }, { text: "Rule 2", correct: true }, { text: "Rule 14", correct: false }, { text: "Rule 10", correct: false }] },
    { question: "I'm humiliating some 'Slavics' in the chat, am I safe?", answers: [{ text: "Rule 11: Slavics are literally on the 'No Hate' list", correct: true }, { text: "Yeah, they're not protected", correct: false }, { text: "Only if you use a translator", correct: false }, { text: "Rule 13: Slurs are fine if they're casual", correct: false }] },
    { question: "I just started a YouTube channel, can I drop the link in <#𝙊𝙁𝙁𝙏𝙊𝙋𝙄𝘾>?", answers: [{ text: "Yeah, get those subs", correct: false }, { text: "Rule 6: It's only spam if you post it twice", correct: false }, { text: "Rule 12: Promotions stay in the <#𝙎𝙀𝙇𝙁-𝙋𝙍𝙊𝙈𝙊𝙏𝙀> channel or you're cooked", correct: true }, { text: "Rule 7: YouTube channel links aren't allowed", correct: false }] },
    { question: "Why is 'Gore' (NSFL) banned? I just wanted to show the boys some real life action", answers: [{ text: "Because the mods are soft", correct: false }, { text: "Because it slows down the server", correct: false }, { text: "It's only allowed in the bot channel", correct: false }, { text: "Rule 10. Bro there are children here", correct: true }] },
    { question: "Is saying 'What the hell' or 'Damn nigga' gonna get me banned?", answers: [{ text: "No, Rule 13: Casual profanity is fine. Just don't use targeted slurs", correct: true }, { text: "Yes, no swearing allowed", correct: false }, { text: "Only if you say it to a mod", correct: false }, { text: "Yes, that's toxic behavior", correct: false }] },
    { question: "Can I ping @everyone to ask if anyone wants to play Roblox?", answers: [{ text: "Yeah, pings are for everyone", correct: false }, { text: "Rule 6: Mass-tagging without permission is a one-way ticket to getting muted", correct: true }, { text: "Only if you're a 'custom role' holder", correct: false }, { text: "Rule 5: It's a roast against the staff", correct: false }] },
    { question: "Where do I use the @OwO bot so I don't get flamed?", answers: [{ text: "Everywhere, it's a bot", correct: false }, { text: "In the <#𝙎𝙐𝙂𝙂𝙀𝙎𝙏𝙄𝙊𝙉𝙎> channel", correct: false }, { text: "In the admin's DMs", correct: false }, { text: "Channel Usage: Keep that bot in the <#𝙊𝙒𝙊> channel", correct: true }] },
    { question: "If I deliberately disrespect Islam or Christianity, am I a 'free thinker'?", answers: [{ text: "Yes, you're a legend", correct: false }, { text: "Rule 2: You're just a rule-breaker about to be banned", correct: true }, { text: "Rule 9: You have to do it in English", correct: false }, { text: "Rule 11: Religious people aren't on the list", correct: false }] },
    { question: "I have a fire idea to make the server better, where do I drop it?", answers: [{ text: "The <#𝙎𝙐𝙂𝙂𝙀𝙎𝙏𝙄𝙊𝙉𝙎> channel. Use your eyes", correct: true }, { text: "Just scream it in the general chat", correct: false }, { text: "DM the admin and pray he replies", correct: false }, { text: "Post it in <#𝙎𝙀𝙇𝙁-𝙋𝙍𝙊𝙈𝙊𝙏𝙀>", correct: false }] },
    { question: "If I post a 'slightly' spicy pic of my 'friend', is it okay?", answers: [{ text: "Rule 8: That's a custom role request", correct: false }, { text: "Rule 10: No NSFW", correct: false }, { text: "If it's not nudity, it's fine", correct: true }, { text: "idk honestly", correct: false }] },
    {
        question: "What's the deal with 'Targeted Slurs' in this server? (THE FINAL Q)",
        answers: [
            { text: "They're fine if you're joking", correct: false },
            { text: "They're only banned in the English channel", correct: false },
            { text: "Slurs are allowed if you're Black or Slavic", correct: false },
            { text: "Rule 13: Targeted slurs = Ban. Casual swearing = OK", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;

// --- ANA FONKSİYONLAR ---

function startTest() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    // Önceki cevapları temizle
    answerOptionsContainer.innerHTML = '';

    // Soru ve ilerleme metnini güncelle
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Soru ${currentQuestionIndex + 1} / ${questions.length}`;

    // Yeni cevap şıklarını oluştur
    currentQuestion.answers.forEach(answer => {
        const optionDiv = document.createElement('div');
        optionDiv.innerText = answer.text;
        optionDiv.classList.add('option');
        
        // Doğru cevabı `data-` attribute olarak sakla
        optionDiv.dataset.correct = answer.correct;

        // Tıklama olayını ekle
        optionDiv.addEventListener('click', selectAnswer);
        
        answerOptionsContainer.appendChild(optionDiv);
    });
}

function selectAnswer(e) {
    const selectedOption = e.target;
    const isCorrect = selectedOption.dataset.correct === 'true';

    if (isCorrect) {
        // Doğru Cevap
        // successSound.play(); // Ses efektini çal (istersen)
        
        // Son soru mu kontrol et
        if (currentQuestionIndex === questions.length - 1) {
            // Test bitti
            showEndModal();
        } else {
            // Sonraki soruya geç
            currentQuestionIndex++;
            showQuestion();
        }
    } else {
        // Yanlış Cevap
        // failSound.play(); // Ses efektini çal (istersen)

        // Uyarı ver ve testi baştan başlat (istediğin gibi)
        alert("WRONG ANSWER! fuhh im restartin it.");
        startTest();
    }
}

// --- MODAL FONKSİYONLARI ---

function showEndModal() {
    appContainer.classList.add('blurred');
    backdrop.classList.add('active');
    endModal.classList.add('active');
}

function showConfirmModal() {
    endModal.classList.remove('active'); // Önceki modalı kapat
    confirmModal.classList.add('active'); // Yeni modalı aç
}

function showCodeModal() {
    endModal.classList.remove('active'); // Önceki modalı kapat
    codeModal.classList.add('active'); // Yeni modalı aç
}

function closeAllModals() {
    appContainer.classList.remove('blurred');
    backdrop.classList.remove('active');
    endModal.classList.remove('active');
    confirmModal.classList.remove('active');
    codeModal.classList.remove('active');
}

// --- MODAL BUTON OLAYLARI ---

// Son Ekran -> Şık 1 ("Emin misin?" ekranını açar)
endOption1Btn.addEventListener('click', showConfirmModal);

// Son Ekran -> Şık 2 (Kod ekranını açar)
endOption2Btn.addEventListener('click', showCodeModal);

// "Emin misin?" -> Evet (Siteden atar)
confirmYesBtn.addEventListener('click', () => {
    alert("Ok ma nigga, see u later");
    // Not: window.close() her zaman çalışmayabilir, about:blank daha garantidir.
    window.location.href = 'about:blank';
});

// "Emin misin?" -> Hayır (Bir önceki ekrana döner)
confirmNoBtn.addEventListener('click', () => {
    confirmModal.classList.remove('active');
    endModal.classList.add('active'); // Önceki (Test Bitiş) ekranını geri aç
});

// Kod Ekranı -> Link Butonu
codeLinkBtn.addEventListener('click', () => {
    // Buraya istediğin linki yazabilirsin
    window.open('https://www.google.com', '_blank');
});

// --- Testi Başlat ---
startTest();


