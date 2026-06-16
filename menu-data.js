const menu = [
    {
        category: "قهوه",
        items: [
            {name:"۶۰/۴۰ ربوستا تک", price:"65"},
            {name:"۶۰/۴۰ ربوستا دوبل", price:"85"},
            {name:"۵۰/۵۰ تک", price:"71"},
            {name:"۵۰/۵۰ دوبل", price:"92"},
            {name:"۸۰/۲۰ ربوستا تک", price:"70"},
            {name:"۸۰/۲۰ ربوستا دوبل", price:"92"},
            {name:"۸۰/۲۰ عربیکا تک", price:"89"},
            {name:"۸۰/۲۰ عربیکا دوبل", price:"99"},
            {name:"۷۰/۳۰ عربیکا تک", price:"88"},
            {name:"۷۰/۳۰ عربیکا دوبل", price:"98"},
            {name:"۷۰/۳۰ ربوستا تک", price:"45"},
            {name:"۷۰/۳۰ ربوستا دوبل", price:"60"},
            {name:"۱۰۰ ربوستا دارک تک", price:"55"},
            {name:"۱۰۰ ربوستا دارک دوبل", price:"65"},
            {name:"۱۰۰ ربوستا مدیوم تک", price:"75"},
            {name:"۱۰۰ ربوستا مدیوم دوبل", price:"95"},
            {name:"۱۰۰ عربیکا تک", price:"83"},
            {name:"۱۰۰ عربیکا دوبل", price:"98"},
            {name:"۱۰۰ عربیکا تک خاستگاهی تک", price:"90"},
            {name:"۱۰۰ عربیکا تک خاستگاهی دوبل", price:"105"},
            {name:"قهوه ترک", price:"95"},
            {name:"قهوه اقتصادی ژوان تک", price:"45"},
            {name:"قهوه اقتصادی ژوان دوبل", price:"60"}
        ]
    },

    {
        category: "چای گرم",
        items: [
            {
                name:"چای ساده",
                sizes:[
                    {size:"یک نفره", price:"75"},
                    {size:"دو نفره", price:"85"},
                    {size:"چهار نفره", price:"95"}
                ]
            },
            {name:"چای زعفران", price:"130"},
            {name:"چای هل", price:"115"},
            {name:"چای سبز", price:"92"},
            {name:"چای آویشن کوهی", price:"125"},
            {name:"چای تیبگ با نبات", price:"50"}
        ]
    },

    {
        category: "دمنوش گرم",
        items: [
            {name:"دمنوش صلح", price:"100"},
            {name:"دمنوش میکس بری", price:"100"},
            {name:"دمنوش براگ", price:"100"},
            {name:"دمنوش برسیکا", price:"100"},
            {name:"دمنوش آنیل", price:"100"},
            {name:"دمنوش زعفران", price:"130"},
            {name:"دمنوش زنجبیل", price:"120"},
            {name:"دمنوش انتخابی دو نفره", price:"110"}
        ]
    },

    {
        category: "بار گرم",
        items: [
            {
                name:"لاته",
                price:"147",
                image:"IMG/Latte.jpg",
                description:"قهوه, شیر داغ و فوم ملایم",
                featured: true
            },
            {name:"لاته با سیروب", price:"177"},
            {name:"لاته ژوان", price:"178"},
            {name:"لاته ژوان با سیروب", price:"208"},
            {name:"کابوچینو", price:"138"},
            {name:"کابوچینو با سیروب", price:"168"},
            {name:"کابوچینو ژوان", price:"158"},
            {name:"کابوچینو ژوان با سیروب", price:"188"},
            {name:"آمریکانو", price:"122"},
            {name:"آمریکانو ژوان", price:"168"},
            {name:"ماچا لاته", price:"168"},
            {name:"لاته اسبرولینا", price:"184"},
            {name:"موکا", price:"160"},
            {name:"موکا ژوان", price:"178"},
            {name:"کافی نات", price:"145"},
            {name:"ماکیاتو", price:"105"},
            {name:"کورتادو", price:"114"},
            {name:"آفوگاتو", price:"160"},
            {
                name:"کاپوچینو پودری",
                price:"110",
                image:"IMG/Cuppochino Podri.jpg",
                description:"کاپوچینو پودری ۲۳۰ سی سی",
                featured: true
            },
            {name:"کن هیلو(آیس اسبرسو)", price:"70"},
            {name:"کن هیلو ژوان(تک خاستگاهی)", price:"95"}
        ]
    },

    {
        category: "نوشیدنی گرم",
        items: [
            {name:"هات چاکلت", price:"145"},
            {name:"وایت چاکلت", price:"145"},
            {name:"دارک چاکلت", price:"145"},
            {name:"بینک چاکلت", price:"145"},
            {name:"مارشملو چاکلت", price:"165"},
            {name:"هات چابلت", price:"165"},

            {
                name:"چای ماسالا",
                price:"140",
                image:"IMG/Masala.jpg",
                description:"دارای ادویه, گرم, انرژی بخش",
                featured:true
            },

            {name:"چای کرک زعفرانی", price:"145"},
            {name:"چای کزک هل", price:"152"},
            {name:"چای کرک ماسالا", price:"145"},
            {name:"شیر چای کاراملی", price:"155"},
            {name:"شیر شکلات فندقی", price:"152"},
            {name:"شیر داغ", price:"83"},
            {name:"شیر عسل", price:"102"},
            {name:"شیر لوتوس", price:"160"}
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
                price:"238",
                image:"IMG/Shake Nutella.jpg",
                description:"بستنی وانیل, نوتلا, شیر, موز",
                featured:true
            },
            {name:"شیک کوکی گردو", price:"219"},
            {name:"شیک بنانا نات", price:"230"},
            {name:"شیک اسنیکرز", price:"236"},
            {name:"شیک چاکلت مینت", price:"230"},
            {name:"شیک بادام زمینی موز", price:"216"},
            {name:"شیک نسکافه بیسکوییت", price:"230"},
            {name:"شیک لوتوس", price:"230"},
            {name:"شیک میکس بری", price:"204"},
            {name:"شیک کارامل کیک", price:"230"},
            {name:"شیک دارک", price:"258"},
            {name:"شیک زرشک", price:"215"},
            {name:"شیک قهوه", price:"212"},
            {name:"شیک توت فرنگی", price:"228"},
            {name:"شیک سیگنیچر", price:"228"}
        ]
    },

    {
        category: "آبمیوه",
        items: [
            {name:"موهیتو", price:"160"},
            {name:"رد موهیتو", price:"177"},
            {name:"لیموناد", price:"155"},
            {name:"بری نات", price:"183"},
            {name:"بلو هاوایی", price:"172"},
            {name:"آب پرتقال", price:"182"},
            {
                name:"آب هویج",
                price:"97",
                image:"IMG/Ab Havij.jpg",
                description:"۴۰۰ سی سی آب هویج طبیعی",
                featured: true
            },
            {name:"شیرموز", price:"140"},
            {name:"آب سیب", price:"110"},
            {name:"آب هویج بستنی", price:"116"},
            {name:"پیناکولادا", price:"156"},
            {name:"موهیتو پشن", price:"160"},
            {name:"ژولیت", price:"166"}
        ]
    },

    {
        category: "بار سرد",
        items: [
            {name:"آیس لاته", price:"145"},
            {name:"آیس لاته ژوان", price:"153"},
            {
                name:"آیس آمریکانو",
                price:"132",
                image:"IMG/Ice Amerikano.jpg",
                description:"قهوه, آب و یخ",
                featured: true
            },
            {name:"آیس آمریکانو ژوان", price:"148"},
            {name:"آیس اسپیرولینا", price:"183"},
            {name:"آیس ماچا", price:"168"},
            {name:"آیس ماچابری", price:"182"},
            {name:"آیس ماکیاتو", price:"145"},
            {name:"آیس موکا", price:"159"},
            {name:"کوکو کافی", price:"155"},
            {name:"اورنج کافی", price:"162"},
            {name:"سیروپ انتخابی", price:"30"}
        ]
    },

    {
        category: "اسموتی",
        items: [
            {name:"اسموتی منگو پیچ", price:"171"},
            {name:"اسموتی بری", price:"174"},
            {
                name:"اسموتی منگو بری",
                price:"170",
                image:"IMG/Mango Berry.jpg",
                description:"انبه و توت فرنگی یخ زده",
                featured: true
            },
            {name:"اسموتی گرین", price:"171"},
            {name:"اسموتی هندوانه", price:"142"},
            {name:"اسموتی اورنج بری", price:"162"},
        ]
    },
    
    {
        category: "فراپه",
        items: [
            {name:"فراپه کلاسیک", price:"160"},
            {name:"فراپه کوکو", price:"178"},
            {name:"فراپه تیرامیسو نعنا", price:"165"},
            {name:"فراپه کوکی نات", price:"163"},
            {name:"چاکلت بری فراپه", price:"205"}
        ]
    },

    {
        category: "صبحانه",
        items: [
            {name:"املت یک نفره", price:"240"},
            {name:"املت دو نفره", price:"360"},
            {name:"نیمرو عسلی یک نفره", price:"165"},
            {name:"نیمرو عسلی دو نفره", price:"250"},
            {name:"سوسیس تخم مرغ یک نفره", price:"280"},
            {name:"سوسیس تخم مرغ دو نفره", price:"420"},
            {name:"کردنبلو", price:"325"},
            {name:"صبحانه انگلیسی", price:"532"},
            {name:"کره بادام زمینی", price:"195"},
            {name:"گوجه ریحان", price:"182"},
            {name:"کره مربا انتخابی", price:"137"}
        ]
    },

    {
        category: "میان وعده",
        items: [
            {name:"بیکن بوقلمون", price:"279"},
            {
                name:"بیکن گوشت",
                price:"272",
                image:"IMG/Baken Gosht.jpg",
                description:" بیکن گوشت, گوجه, ریحان, نون چاباتا",
                featured: true
            },
            {name:"بیکن مخلوط", price:"276"},
            {name:"هات چیپس یک نفره", price:"558"},
            {name:"هات چیپس دو نفره", price:"756"},
            {
                name:"پاستا آلفردو",
                price:"485",
                image:"IMG/Pasta Alfredo.jpg",
                description:"۱۵۰ گرم مرغ, پنه, قارچ, جعفری",
                featured: true
            },
            {name:"پاستا پستو", price:"485"},
            {name:"سیب زمینی ساده", price:"258"},
            {name:"سیب زمینی چدار", price:"276"},
            {name:"سیب زمینی با بیکن", price:"298"},
            {name:"سالاد سزار", price:"420"}
        ]
    },


];