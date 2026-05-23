import { useState } from 'react'
import TitlePage from './TitlePage'
import './App.css'

function App() {
    const foods = [
        {
            name: 'カツ丼',
            kcal: 900,
            unit: '杯',
            image: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG8I0PJRP6c7g_XKCSGvyzDwRa8yJjMD4-Jw7yF8MnQvzShtelAXGLOfLAGJCbUWTqBQd2kYLj4sGuBVS8qWHAIngBOm2FJN0hGbgNjRbPwZWD3ZUCmeiantMpmhNN2CKwCvbw21SXkVU3Rdc1H7afcwQVJncS-o7TEe-hz6cXyx_ddtrnLBqUTDFx2qpz8tm0DA-fSN5Jom3deqJps8FX7hQdiWJHKcOycxAebXoTZYZ1geT2H-UfCQdR_J2gexqzyvtK6NVwVo66s_OwVHVK9o=/E6B888EFBC97.jpg?errorImage=false',
        },
        {
            name: '大福',
            kcal: 250,
            unit: '個',
            image: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG1kFgzUBi2vigmURnXfA8OY4HN9nunlA2dB0Z6OZQ7q-znSuyHC1jOzJp2pMuKfJ4czJQtLPG0gk3t9MS1tM5IwX8AX3qh-9DSXgfibyHETgg2yuG7mNSq88XqMdvk2yXYwScBrJvledgS-xWZ07rwS2ySL31eUa0V8sdvpKR6luZYOyV3AIxnWUVCIpXYpM-UNpXUZiZov7UYnDlzh7rN8=/ca92c508d5103ec60521fda518a51669_t.jpeg?errorImage=false',
        },
        {
            name: '大根',
            kcal: 15,
            unit: '本',
            image: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG_4SPDMEJAVjoxj_RdyVMJAKCdlQYASQam2R7qP04bov_vNk9Tr7wlIS5HG1QWI1N4PaHL_IUsYwohm_-dRggvy4tIzasu4MDM4HEPfsxXllBOpUye4z46k_rbILmdQD_IzPHrD_gAlnZUxG7DxXD903aPT1WatEah4BUIpX9OIAJtKei95tIZYwShCawkTcTuxP4RKRv3VP-pWxEE1J4j0CAzyR53C0koqM5HqTnlos8mi-09LhozO34vhCyqdWM3T9fLFq-tbv2Cs5Iy-5L2gdAaOGvy5mi9N2Foka_pdkhPMd53S1S0wNBH-vr0pKYMni-ecyOKT_F5krZZb6Z-Yf2Me_EAwfr2RAHoobpHeLTP8PIMS5MVHdE_VAHhntw3OUmbYu6SOqL9sOA1_tJcC-28Dnzdwbe3RYcQ_5VsW3/pngtree-whole-fresh-daikon-radish-white-root-with-transparent-background-png-image_16385222.png?errorImage=false',
        },
        {
            name: 'どんぐり',
            kcal: 10,
            unit: '個',
            image: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG_4SPDMEJAVjoxj_RdyVMJAKCdlQYASQam2R7qP04bov6X44J6GvBZDbp9NRuU-8TYPaHL_IUsYwohm_-dRggvwS43ztP1u3zaiKoKaCkZWkfGzN8unBth5CN3JsnhALEF-vJrS-cSg8OXLM2EKXiWuHKHAHOcRtFqRRQ1agMDwYg-WLN3m596BLIHPgUcaMwCd95yjsXa47nalLwsAFvYT5xOT9IoqIZk4oK-PS60wVouJRE5L6WvH5WcGiQU7--wEky4OJvG2lcRftHHZBzpUIkAzIEm77I0NRXgx2J3jkjDb6uwqNV_ida4guX4FT4FftzYmpFG1o2mD5cZOUTcE=/pngtree-pile-of-ripe-brown-acorns-png-image_17354420.webp?errorImage=false',
        },
        {
            name: 'ダチョウの肉',
            kcal: 140,
            unit: '枚',
            image: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG5DW-JSWJsB2yJ7ufvkuzOsv2fFavBUs_EoXeA_dAlzixAlctITVsINZkbnVFTjhJPDAVHSU0XdmCXE6iK9IPnzCtf3I_YRM5zxyKSe4LAjfRpXI8zagw7M7s6pqkyURoK5MJF7UClkwQJAhIfhxWq7qZgP_mkV4luvwDfWDVtsYYW_6SHjT2HCximKeLz9wKvXdGZ3V7fgiEV8Dw8w8aSwBgWbSXUK1SK-Pl6H6JKGP/Real-face-close-up-2506_4-5.webp?errorImage=false',
        },
        {
            name: 'ドラゴンフルーツ',
            kcal: 15,
            unit: '個',
        image: 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG5Bn3DxYLYALg8Tg4zrToQ7LwaoYx72hI_QPi-3zSfy2ZrGECGyHEWu7J5AQW-kAHwEwZ0BXVoYW-1B6WfVSFLX7Ap33Gha8JNttI1VqQjZT8yFD8f4htttvG_i7s5UaHjIxyGn78OBewLYkxPOISC3PJQVfe0n_YVs5FK58NEAWoXAtSgGV-lyT6U6aV2P_xgz9APU_6jtg-AVSN-fy47GGdaZe5tO-t73x4SIr5VCCi5eKV7gFFa2schHKPpkoQdOYF_8Y11cliWfkB7NfLuBhTio9PYFI6KkFFPBdODbEccwL06VAu_VrzQerN9vxCQ==/dragonfruit-fruits-isolated-transparent-background_191095-14619.jpg',
        },
        {
            name: 'ダニエルが育てた謎の野菜',
            kcal: 2750,
            unit: '束',
            image: '/images/スクリーンショット 2026-05-23 021419.png',
        },
    ]
    
    const [kcal, setKcal] = useState('')
    const [randomFood, setRandomFood] = useState(foods[0])
    const [showTitlePage, setShowTitlePage] = useState(true)
    const changeFood = () =>{
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
    }
    
    const amount = kcal === '' ? 0 : Number(kcal) / randomFood.kcal
    const unitCount = Math.floor(amount)
    const visibleCount = Math.min(unitCount, 20)
    const moreCount = unitCount - visibleCount

    if (showTitlePage) {
        return <TitlePage onBack={() => setShowTitlePage(false)} />
    }

    return (
        <div className="app-container">
            <h1>カロリー量を入力してください</h1>

            <button onClick={() => setShowTitlePage(true)}>
                タイトルページへ
            </button>

            <input
                type="number"
                min="1"
                placeholder="カロリーを入力してください"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
            />
            <button onClick={changeFood}>
                食べ物を変更
            </button>

            <p>
                入力されたカロリーは {randomFood.name}{' '}
                {amount === 0 ? 0 : amount.toFixed(2)} {randomFood.unit} です
            </p>

            {unitCount > 0 && (
                <div className="food-image-list">
                    {Array.from({ length: visibleCount }, (_, index) => (
                        <img
                            key={index}
                            src={randomFood.image}
                            alt={`${randomFood.name} ${index + 1}`}
                            className="food-image"
                        />
                    ))}
                    {moreCount > 0 && (
                        <div className="more-count">+{moreCount} つ</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default App