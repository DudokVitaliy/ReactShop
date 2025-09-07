import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Fab } from '@mui/material';
import GoodsCard from '../../components/Cards/GoodsCard';
import { Link } from "react-router";
import AddIcon from "@mui/icons-material/Add";

const initialGoods = [
  {
    name: 'Мобільний телефон Apple iPhone 16 Pro Max 256GB Black Titanium',
    description: 'Камера 12 Мп / Діафрагма ƒ/1.9 / Автофокус із Focus Pixels / Retina Flash / Фотонний двигун / Глибокий синтез / Smart HDR 5 / Портрети нового покоління з фокусуванням і керуванням глибиною / Портретне освітлення із шістьма ефектами / Animoji та Memoji / Нічний режим',
    image: 'https://content.rozetka.com.ua/goods/images/big/468886057.jpg'
  },
  {
    name: 'Мобільний телефон Samsung Galaxy A26 5G 6/128GB Black',
    description: 'Екран (6.7", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (2.4 ГГц + 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 2 Мп, фронтальна 13 Мп / RAM 6 ГБ / 128 ГБ вбудованої пам\'яті + microSD (до 2 ТБ) / 3G / LTE / 5G / GPS / підтримка 2х SIM-карт (Nano-SIM) / Android 15 / 5000 мА*год',
    image: 'https://content2.rozetka.com.ua/goods/images/big/523634241.jpg'
  },
  {
    name: 'Навушники Apple AirPods (4-те покоління)',
    description: 'AirPods 4 з покращеною якістю звуку, до 30 годин автономної роботи та зручним бездротовим підключенням до екосистеми Apple, піднімають досвід користувача на новий рівень. Новий дизайн, створений з використанням 3D-фотограмметрії та лазерної топографії, забезпечує максимальний комфорт та підходить більшій кількості користувачів.',
    image: 'https://content1.rozetka.com.ua/goods/images/big/468886072.jpg'
  },
  {
    name: 'Смарт-годинник Samsung Galaxy Watch 8 Classic Black',
    description: 'Культовий обертовий безель повертається! Ця виключна особливість моделей Classic надає Galaxy Watch8 Classic вишуканого елегантного вигляду. Однак це не лише естетично, а й функціонально – просто обертайте безель для плавного та інтуїтивного прокручування. Обертовий безель та оновлений дизайн у формі м\'якого квадрата роблять Galaxy Watch8 Classic справжнім еталоном смартгодинника.',
    image: 'https://content.rozetka.com.ua/goods/images/big/568716128.jpg'
  },
  {
    name: 'Телевізор LG 50"',
    description: 'Ultra HD надає кожному кольору яскравої яскравості. Дивіться кришталево чисті зображення з реалістичною чіткістю. Інтелектуальний процесор Alpha 5 AI 4K Gen7 автоматично оптимізує звук і яскравість для повного занурення в дію. Звукова система визначає планування вашої кімнати та місце, де ви сидите, створюючи навколо вас звуковий купол, ідеально узгоджений з унікальною акустикою вашої кімнати.',
    image: 'https://content2.rozetka.com.ua/goods/images/big/557124945.jpg'
  },
  {
    name: 'Портативна колонка JBL Go 4 4.2W Black',
    description: 'JBL Go 4 має серйозну музичну міць, забезпечуючи відмінний звук JBL Pro Sound з потужними басами. Ваші друзі не повірять, наскільки чудовий звук JBL Pro звучить з такої маленької колонки. Вбудований мікрофон з функцією шумозаглушення дозволяє приймати дзвінки в режимі "hands-free" з кришталево чистим звуком. Підключайтеся до JBL Go 4 через Bluetooth і насолоджуйтеся улюбленою музикою без проводів.',
    image: 'https://content1.rozetka.com.ua/goods/images/big/419710870.jpg'
  },
  {
    name: 'Рюкзак спортивний Columbia Lightweight Packable Backpac',
    description: 'Передня кишеня для аксесуарів. Ручка для перенесення. Внутрішня кишеня для аксесуарів. Бічні сітчасті кишені. Регульовані лямки. Легка вага, компактне зберігання.',
    image: 'https://content1.rozetka.com.ua/goods/images/big/474231691.jpg'
  },
  {
    name: 'Кросівки Nike Air Max 270 React',
    description: 'Верх з поєднання текстилю та синтетичних матеріалів для міцності та підтримки. Система шнурівки забезпечує надійну посадку. Підошва з піни для м\'якої амортизації. Віконце Air Max у п\'яті для додаткової амортизації. Резинова підошва для міцності та зчеплення.',
    image: 'https://content.rozetka.com.ua/goods/images/big/185313657.jpg'
  },
  {
    name: 'Пральна машина Samsung WW90T554DAW/S7',
    description: 'Тип завантаження: фронтальна, Максимальне завантаження: 9 кг, Клас енергоспоживання: A, Клас прання: A, Клас віджиму: B, Максимальна швидкість віджиму: 1400 об/хв, Рівень шуму при пранні: 52 дБ, Рівень шуму при віджимі: 73 дБ, Кількість програм: 14, Дисплей: є, Колір: білий',
    image: 'https://content1.rozetka.com.ua/goods/images/big/158455591.jpg'
  },
  {
    name: 'Холодильник LG GA-B509CQWL',
    description: 'Тип: двокамерний, Розташування морозильної камери: знизу, Загальний об\'єм: 501 л, Об\'єм холодильного відділення: 363 л, Об\'єм морозильного відділення: 138 л, Клас енергоспоживання: A, Кліматичний клас: SN-T, Рівень шуму: 39 дБ, Управління: електронне, Дисплей: є, Колір: білий',
    image: 'https://content2.rozetka.com.ua/goods/images/big/322283974.jpg'
  },
  {
    name: 'Ноутбук Apple MacBook Air 15" M2 256GB Silver',
    description: 'Дисплей: 15.3" Liquid Retina, 2880x1864, процесор: Apple M2 (8-ядерний), оперативна пам\'ять: 8 ГБ LPDDR4X, накопичувач: 256 ГБ SSD, графіка: Apple 10-ядерна, камера: 1080p FaceTime HD, бездротові інтерфейси: Wi-Fi 6, Bluetooth 5.0, порти: 2x Thunderbolt / USB 4, аудіо: стереодинаміки з підтримкою Dolby Atmos, мікрофони: трьохмікрофонна система спрямованого запису, клавіатура: Magic Keyboard з підсвічуванням, Touch ID, ОС: macOS Monterey',
    image: 'https://content1.rozetka.com.ua/goods/images/big/524011205.jpg'
  },
  {
    name: 'Планшет Samsung Galaxy Tab A8 10.5" 64GB Gray',
    description: 'Дисплей: 10.5" TFT, 1920x1200, процесор: Unisoc Tiger T618 (2.0 ГГц + 1.8 ГГц), оперативна пам\'ять: 4 ГБ, накопичувач: 64 ГБ eMMC, графіка: Mali G52 MP2, камера: основна 8 Мп, фронтальна 5 Мп, бездротові інтерфейси: Wi-Fi 5, Bluetooth 5.0, GPS, порти: USB-C, аудіо: стереодинаміки з підтримкою Dolby Atmos, акумулятор: 7040 мАг, ОС: Android 11',
    image: 'https://content1.rozetka.com.ua/goods/images/big/371848404.jpg'
  },
  {
    name: 'Електрична зубна щітка Philips Sonicare ProtectiveClean 4300 HX6807/11',
    description: 'Тип: звичайна, Живлення: акумулятор, Кількість режимів роботи: 3, Таймер: є, Індикатор заряду батареї: є, Кількість насадок у комплекті: 1, Колір: білий',
    image: 'https://content1.rozetka.com.ua/goods/images/big/550381451.jpg'
  },
  {
    name: 'Фен Dyson Supersonic HD03',
    description: 'Потужність: 1600 Вт, Кількість режимів температури: 4, Кількість швидкостей: 3, Холодний обдув: є, Іонізація: є, Концентратор: є, Диффузор: є, Петелька для підвішування: є, Колір: фіолетовий/сріблястий',
    image: 'https://content.rozetka.com.ua/goods/images/big/118706320.jpg'
  },
  {
    name: 'Електросамокат Xiaomi Mi Electric Scooter 3 Black',
    description: 'Максимальна швидкість: 25 км/год, Максимальний кут підйому: 15°, Запас ходу: до 30 км, Час зарядки: 3.5 год, Потужність двигуна: 300 Вт, Максимальне навантаження: 100 кг, Вага: 12.5 кг, Колеса: 8.5" надувні, Гальма: електронне та дискове заднє, Портативність: складна конструкція, Колір: чорний',
    image: 'https://content.rozetka.com.ua/goods/images/big/439324000.jpg'
  },
  {
    name: 'Станок для гоління чоловічий (бритва) Gillette Fusion ProGlide ',
    description: 'Тип: бритва, Кількість лез: 5, Плаваюча голівка: є, Система зволоження: є, Тример для вусів і бакенбардів: є, Колір: синій/сріблястий',
    image: 'https://content2.rozetka.com.ua/goods/images/big/550479405.jpg'
  },
  {
    name: 'Електрична зубна щітка Oral-B Pro 2 2500N Black',
    description: 'Тип: звичайна, Живлення: акумулятор, Кількість режимів роботи: 2, Таймер: є, Індикатор заряду батареї: є, Кількість насадок у комплекті: 1, Колір: чорний',
    image: 'https://content1.rozetka.com.ua/goods/images/big/496738887.jpg'
  },
  {
    name: 'Рюкзак міський The North Face Borealis Classic TNF Black/TNF White',
    description: 'Основне відділення з органайзером для ноутбука до 15" і планшета. Передня кишеня з органайзером для аксесуарів. Бічні сітчасті кишені. Компресійні ремені. Регульовані лямки з м\'якою підкладкою. Вентильована спинка з сітчастою підкладкою.',
    image: 'https://content1.rozetka.com.ua/goods/images/big/552389879.jpg'
  },
  {
    name: 'Кросівки Adidas Ultraboost 22',
    description: 'Верх з Primeknit+ для підтримки та комфорту. Підошва Boost для енергії та амортизації. Підошва Stretchweb з Continental™ Rubber для зчеплення на будь-якій поверхні. Підтримка середнього відрізку стопи з технологією Torsion System.',
    image: 'https://content.rozetka.com.ua/goods/images/big/590890687.jpg'
  },
  {
    name: 'Скакалка швидкісна EasyFit EF-1912 260 см Чорна',
    description: 'Довжина: 260 см, Матеріал троса: сталь з ПВХ покриттям, Ручки: пінопластові з підшипниками, Регульована довжина: є, Колір: чорний',
    image: 'https://content.rozetka.com.ua/goods/images/big/441975907.jpg'
  },
  {
    name: 'Фітнес-браслет Xiaomi Mi Smart Band 7 Black',
    description: 'Дисплей: 1.62" AMOLED, 192x490, процесор: Dialog DA14706, оперативна пам\'ять: 512 КБ, накопичувач: 16 МБ, датчики: акселерометр, гіроскоп, пульсометр, датчик освітленості, пульсоксиметр, бездротові інтерфейси: Bluetooth 5.2, акумулятор: 180 мАг, час роботи: до 14 днів, захист: 5ATM, сумісність: Android 6.0+, iOS 10.0+, колір: чорний',
    image: 'https://content2.rozetka.com.ua/goods/images/big/409483516.jpg'
  },
  {
    name: 'Генератор бензиновий Rato R8500D-L2 Full Power 6.4/6.8 кВт',
    description: 'Тип: бензиновий, Потужність: 6.4/6.8 кВт, Двигун: Rato R210, Об\'єм двигуна: 420 см³, Тип запуску: електростартер/ручний, Об\'єм паливного бака: 25 л, Час роботи при 50% навантаженні: до 10 годин, Рівень шуму: 72 дБ, Виходи: 1x220В (16А), 1x220В (32А), 1x12В (8.3А), Колір: червоний',
    image: 'https://content1.rozetka.com.ua/goods/images/big/317315598.jpg'
  },
  {
    name: 'Міксер Bosch MFQ40304',
    description: 'Тип: ручний, Потужність: 500 Вт, Кількість швидкостей: 5, Турборежим: є, Матеріал корпусу: пластик, Насадки в комплекті: віночки, гак для тіста, Колір: білий/синій',
    image: 'https://content2.rozetka.com.ua/goods/images/big/10620891.jpg'
  },
];

function GoodsListPage() {
  const [inputData, setInputData] = useState({ name: '', description: '', image: '' });
  const [goods, setGoods] = useState(initialGoods);

  useEffect(() => {
    const localData = localStorage.getItem('goods');
    if (localData) {
      setGoods(JSON.parse(localData));
    }
  }, []);

  const inputChangeHandler = (newValue, prop) => {
    setInputData(prev => ({ ...prev, [prop]: newValue }));
  };

  const createGoodsHandler = () => {
    const newGoods = {
      name: inputData.name,
      description: inputData.description,
      image: inputData.image
    };

    if (!newGoods.name || !newGoods.description || !newGoods.image) {
      return;
    }

    const updatedGoods = [...goods, newGoods];
    setGoods(updatedGoods);
    setInputData({ name: '', description: '', image: '' });
    localStorage.setItem('goods', JSON.stringify(updatedGoods));
  };

const deleteGoodsHandler = (name) => {
  const updatedGoods = goods.filter(item => item.name !== name);
  setGoods(updatedGoods);
  localStorage.setItem('goods', JSON.stringify(updatedGoods));
};



  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
        Товари
      </Typography>
      <Grid container spacing={2} sx={{ px: 3, py: 5 }}>
        {goods.map((item, index) => (
          <Grid key={index} size={3}>
            <GoodsCard goods={item} deleteCallback={deleteGoodsHandler} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "end", mb: 2, mx: 4 }}>
                <Link to="create">
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Box>
    </>
  );
}

export default GoodsListPage;
