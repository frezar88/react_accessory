import './styles/App.scss';
import CardsList from "./components/CardsList";
import MySelect from "./components/UI/MySelect";
import {useEffect, useState} from "react";


function App() {
    const [cards, setCards] = useState([
        {
            brandId: "00011123",
            brandName: "Renault",
            modelId: "00234232",
            modelName: "Sandero",
            accessoryId: "0031203",
            accessoryName: "Коврики в салон, велюровые, черные, 4 шт.",
            accessoryPhoto: "https://cdn.kodixauto.ru/media/resized_image/webp/5dea1939019a2500018b7b62/768/0",
            accessoryDescription: "Какое-то описание акса",
            accessoryPriceWork: 470,
            accessoryPriceWorkDiscount: 450,
            accessoryPriceProduct: 500,
            accessoryPriceProductDiscount: 400
        },
        {
            brandId: "00011123",
            brandName: "Renault",
            modelId: "00234232",
            modelName: "Duster",
            accessoryId: "0031203",
            accessoryName: "16\" Легкосплавный диск Laser, серый",
            accessoryPhoto: "https://cdn.kodixauto.ru/media/resized_image/webp/5dc560bd3ef1430001d1c942/768/0",
            accessoryDescription: "Какое-то описание акса",
            accessoryPriceWork: 170,
            accessoryPriceWorkDiscount: 150,
            accessoryPriceProduct: 400,
            accessoryPriceProductDiscount: 100
        },
        {
            brandId: "00011123",
            brandName: "Renault",
            modelId: "00234232",
            modelName: "Logan",
            accessoryId: "0031203",
            accessoryName: "Дефлекторы окон",
            accessoryPhoto: "https://cdn.kodixauto.ru/media/resized_image/webp/5dc562a03ef1430001d1c943/768/0",
            accessoryDescription: "Какое-то описание акса",
            accessoryPriceWork: 270,
            accessoryPriceWorkDiscount: 250,
            accessoryPriceProduct: 250,
            accessoryPriceProductDiscount: 200
        },
    ]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        const brandsSet = new Set();
        const modelsSet = new Set();

        cards.forEach(({brandName, modelName}) => {
            brandsSet.add(brandName);
            modelsSet.add(modelName);
        });
        setBrands([...brandsSet].map((brand) => {
            return {value: brand, name: brand};
        }));
        setModels([...modelsSet].map((brand) => {
            return {value: brand, name: brand};
        }));
    }, []);

    const  [cardsEdit, setCardsEdit] = useState([...cards]);
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setCardsEdit([...cardsEdit].sort(function (a, b) {
            if (sort === 'ascendingPrice') {
                return a.accessoryPriceProductDiscount - b.accessoryPriceProductDiscount;
            } else {
                return b.accessoryPriceProductDiscount - a.accessoryPriceProductDiscount;
            }
        }));
    }

    const sortPostsModel = (model) => {
        // const [cardsCopy, setCardsCopy] = useState([...cards])
        setSelectedModel(model);
        setCardsEdit([...cards].filter(card => card.modelName === model));
    };

    return (
        <div className="App">

            <div className="selectGroup" style={{display: "flex", flexWrap: "wrap"}}>
                <MySelect
                    value={selectedModel}
                    onChange={sortPostsModel}
                    defaultValue="Модель"
                    options={models}
                />

                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка по"
                    options={[{value: 'ascendingPrice', name: 'По возрастанию цены'}, {
                        value: 'descendingPrice',
                        name: 'По убыванию цены'
                    }]}
                />
            </div>

            <CardsList cards={cardsEdit}/>
        </div>
    );
}

export default App;
