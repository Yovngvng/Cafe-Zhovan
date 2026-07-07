const menu = [
    {
        category: "قهوه",
        items: [
            {name:"۶۰/۴۰ ربوستا تک", price:"115"},
            {name:"۶۰/۴۰ ربوستا دوبل", price:"140"},
            {name:"۵۰/۵۰ تک", price:"150"},
            {name:"۵۰/۵۰ دوبل", price:"190"},
            {name:"۸۰/۲۰ ربوستا تک", price:"95"},
            {name:"۸۰/۲۰ ربوستا دوبل", price:"110"},
            {name:"۸۰/۲۰ عربیکا تک", price:"150"},
            {name:"۸۰/۲۰ عربیکا دوبل", price:"190"},
            {name:"۷۰/۳۰ عربیکا تک", price:"130"},
            {name:"۷۰/۳۰ عربیکا دوبل", price:"180"},
            {name:"۷۰/۳۰ ربوستا تک", price:"70"},
            {name:"۷۰/۳۰ ربوستا دوبل", price:"90"},
            {name:"۱۰۰ ربوستا دارک تک", price:"75"},
            {name:"۱۰۰ ربوستا دارک دوبل", price:"95"},
            {name:"۱۰۰ ربوستا مدیوم تک", price:"115"},
            {name:"۱۰۰ ربوستا مدیوم دوبل", price:"140"},
            {name:"۱۰۰ عربیکا تک", price:"115"},
            {name:"۱۰۰ عربیکا دوبل", price:"140"},
            {name:"۱۰۰ عربیکا تک خاستگاهی تک", price:"190"},
            {name:"۱۰۰ عربیکا تک خاستگاهی دوبل", price:"230"},
            {name:"قهوه ترک", price:"120"}
        ]
    },

    {
        category: "چای گرم",
        items: [
            {
                name:"چای ساده",
                sizes:[
                    {size:"یک نفره", price:"100"},
                    {size:"دو نفره", price:"120"},
                    {size:"چهار نفره", price:"160"}
                ]
            },
            {name:"چای زعفران", price:"200"},
            {name:"چای هل", price:"180"},
            {name:"چای سبز", price:"130"},
            {name:"چای آویشن کوهی", price:"200"},
            {name:"چای تیبگ با نبات", price:"80"},
            {name:"چای خواب", price:"180"},
            {name:"چای میوه‌ای", price:"180"},
            {name:"چای فلفل", price:"160"},
            {name:"چای زعفران دو نفره", price:"230"}
        ]
    },

    {
        category: "دمنوش گرم",
        items: [
            {name:"دمنوش صلح", price:"170"},
            {name:"دمنوش میکس بری", price:"160"},
            {name:"دمنوش براگ", price:"160"},
            {name:"دمنوش برسیکا", price:"160"},
            {name:"دمنوش آنیل", price:"160"},
            {name:"دمنوش زعفران", price:"210"},
            {name:"دمنوش زنجبیل", price:"200"},
            {name:"دمنوش انتخابی دو نفره", price:"200"}
        ]
    },

    {
        category: "بار گرم",
        items: [
            {
                name:"لاته",
                price:"220",
                image:"IMG/Latte.jpg",
                description:"قهوه, شیر داغ و فوم ملایم",
                featured: true
            },
            {name:"لاته با سیروب", price:"270"},
            {name:"لاته ژوان", price:"240"},
            {name:"لاته ژوان با سیروب", price:"280"},
            {name:"کاپوچینو", price:"200"},
            {name:"کابوچینو با سیروب", price:"240"},
            {name:"کابوچینو ژوان", price:"220"},
            {name:"کابوچینو ژوان با سیروب", price:"260"},
            {name:"آمریکانو", price:"180"},
            {name:"آمریکانو ژوان", price:"200"},
            {name:"ماچا لاته", price:"250"},
            {name:"لاته اسبرولینا", price:"280"},
            {name:"موکا", price:"230"},
            {name:"موکا ژوان", price:"250"},
            {name:"کافی نات", price:"200"},
            {name:"ماکیاتو", price:"150"},
            {name:"کورتادو", price:"150"},
            {name:"آفوگاتو", price:"240"},
            {
                name:"کاپوچینو پودری",
                price:"160",
                image:"IMG/Cuppochino Podri.jpg",
                description:"کاپوچینو پودری ۲۳۰ سی سی",
                featured: true
            }
        ]
    },

    {
        category: "نوشیدنی گرم",
        items: [
            {name:"هات چاکلت", price:"200"},
            {name:"وایت چاکلت", price:"200"},
            {name:"دارک چاکلت", price:"200"},
            {name:"بینک چاکلت", price:"210"},
            {name:"مارشملو چاکلت", price:"185"},
            {name:"هات چابلت", price:"210"},

            {
                name:"چای ماسالا",
                price:"190",
                image:"IMG/Masala.jpg",
                description:"دارای ادویه, گرم, انرژی بخش",
                featured:true
            },

            {name:"چای کرک زعفرانی", price:"200"},
            {name:"چای کزک هل", price:"200"},
            {name:"چای کرک ماسالا", price:"195"},
            {name:"شیر چای کاراملی", price:"210"},
            {name:"شیر شکلات فندقی", price:"240"},
            {name:"شیر داغ", price:"120"},
            {name:"شیر عسل", price:"150"},
            {name:"شیر لوتوس", price:"220"}
        ]
    },

    {
        category: "کیک و دسر",
        items: [
            {name:"چیز کیک", price:"203"},
            {name:"کاب کیک", price:"170"},
            {name:"جار کیک", price:"195"},
            {name:"کروسان ساده", price:"110"},
            {name:"کروسان شکلاتی", price:"140"},
            {name:"کروسان ژوان", price:"160"},
            {name:"وافل ویژه", price:"310"}
        ]
    },

    {
        category: "شیک",
        items: [
            {
                name:"شیک نوتلا",
                price:"380",
                image:"IMG/Shake Nutella.jpg",
                description:"بستنی وانیل, نوتلا, شیر, موز",
                featured:true
            },
            {name:"شیک کوکی گردو", price:"310"},
            {name:"شیک بنانا نات", price:"310"},
            {name:"شیک اسنیکرز", price:"320"},
            {name:"شیک چاکلت مینت", price:"310"},
            {name:"شیک بادام زمینی موز", price:"320"},
            {name:"شیک نسکافه بیسکوییت", price:"310"},
            {name:"شیک لوتوس", price:"310"},
            {name:"شیک میکس بری", price:"290"},
            {name:"شیک کارامل کیک", price:"320"},
            {name:"شیک دارک", price:"380"},
            {name:"شیک زرشک", price:"285"},
            {name:"شیک قهوه", price:"295"},
            {name:"شیک توت فرنگی", price:"310"},
            {name:"شیک سیگنیچر", price:"310"}
        ]
    },

    {
        category: "آبمیوه",
        items: [
            {name:"موهیتو", price:"200"},
            {name:"رد موهیتو", price:"200"},
            {name:"لیموناد", price:"190"},
            {name:"بری نات", price:"240"},
            {name:"بلو هاوایی", price:"250"},
            {name:"آب پرتقال", price:"260"},
            {
                name:"آب هویج",
                price:"120",
                image:"IMG/Ab Havij.jpg",
                description:"۴۰۰ سی سی آب هویج طبیعی",
                featured: true
            },
            {name:"شیرموز", price:"300"},
            {name:"آب سیب", price:"210"},
            {name:"آب هویج بستنی", price:"150"},
            {name:"پیناکولادا", price:"240"},
            {name:"موهیتو پشن", price:"240"},
            {name:"ژولیت", price:"260"}
        ]
    },

    {
        category: "بار سرد",
        items: [
            {name:"آیس لاته", price:"230"},
            {name:"آیس لاته ژوان", price:"250"},
            {
                name:"آیس آمریکانو",
                price:"190",
                image:"IMG/Ice Amerikano.jpg",
                description:"قهوه, آب و یخ",
                featured: true
            },
            {name:"آیس آمریکانو ژوان", price:"210"},
            {name:"آیس اسپیرولینا", price:"310"},
            {name:"آیس ماچا", price:"280"},
            {name:"آیس ماچابری", price:"290"},
            {name:"آیس ماکیاتو", price:"200"},
            {name:"آیس موکا", price:"240"},
            {name:"کوکو کافی", price:"190"},
            {name:"اورنج کافی", price:"210"},
            {name:"سیروپ انتخابی", price:"40"}
        ]
    },

    {
        category: "اسموتی",
        items: [
            {name:"اسموتی منگو پیچ", price:"250"},
            {name:"اسموتی بری", price:"240"},
            {
                name:"اسموتی منگو بری",
                price:"250",
                image:"IMG/Mango Berry.jpg",
                description:"انبه و توت فرنگی یخ زده",
                featured: true
            },
            {name:"اسموتی گرین", price:"240"},
            {name:"اسموتی هندوانه", price:"240"},
            {name:"اسموتی اورنج بری", price:"240"},
        ]
    },
    
    {
        category: "فراپه",
        items: [
            {name:"فراپه کلاسیک", price:"240"},
            {name:"فراپه کوکو", price:"260"},
            {name:"فراپه تیرامیسو نعنا", price:"260"},
            {name:"فراپه کوکی نات", price:"250"},
            {name:"چاکلت بری فراپه", price:"270"}
        ]
    },

    {
        category: "صبحانه",
        items: [
            {name:"املت یک نفره", price:"350"},
            {name:"املت دو نفره", price:"450"},
            {name:"نیمرو عسلی یک نفره", price:"250"},
            {name:"نیمرو عسلی دو نفره", price:"350"},
            {name:"سوسیس تخم مرغ یک نفره", price:"380"},
            {name:"سوسیس تخم مرغ دو نفره", price:"580"},
            {name:"کردنبلو", price:"430"},
            {name:"صبحانه انگلیسی", price:"720"},
            {name:"کره بادام زمینی", price:"234"},
            {name:"گوجه ریحان", price:"218"},
            {name:"کره مربا انتخابی", price:"180"}
        ]
    },

    {
        category: "میان وعده",
        items: [
            {name:"بیکن بوقلمون", price:"384"},
            {
                name:"بیکن گوشت",
                price:"376",
                image:"IMG/Baken Gosht.jpg",
                description:" بیکن گوشت, گوجه, ریحان, نون چاباتا",
                featured: true
            },
            {name:"بیکن مخلوط", price:"381"},
            {name:"هات چیپس یک نفره", price:"769"},
            {name:"هات چیپس دو نفره", price:"982"},
            {
                name:"پاستا آلفردو",
                price:"582",
                image:"IMG/Pasta Alfredo.jpg",
                description:"۱۵۰ گرم مرغ, پنه, قارچ, جعفری",
                featured: true
            },
            {name:"پاستا پستو", price:"582"},
            {name:"سیب زمینی ساده", price:"310"},
            {name:"سیب زمینی چدار", price:"352"},
            {name:"سیب زمینی با بیکن", price:"378"},
            {name:"سالاد سزار", price:"504"}
        ]
    },


];
