import React, { useEffect, useState } from "react";
import Card, { CardType } from "../Card/Card";
import Title from "../Title/Title";
import "./Menu.css";

type displayMode = 'grid' | 'list';

interface MenuProps {
    defaultDisplay: displayMode;
}

function Menu(props: MenuProps) {

    const [display, setDisplay] = useState<displayMode>(props.defaultDisplay);
    const [cards, setCards] = useState<Array<CardType>>([]);
    const [filteredByCategory, setFilteredByCategory] = useState<Array<CardType>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categories, setCategories] = useState<Array<string>>(['all', 'chicken', 'vegeterian', 'asian']);

    useEffect(() => {
        fetch('http://localhost:3000/cards/')
            .then(res => res.json())
            .then(json => {
                setCards(json);
                setFilteredByCategory(json);
            })
    })

    function changeDisplay(mode: displayMode) {
        setDisplay(mode);

        // not allowed here
        // useState()
        // useEffect()
    }

    function categoryChange(selected: string) {
        const filtered = cards.filter(card => {
            return card.category === selected;
        });

        const byCategory = selected === 'all' ? cards : filtered;
        setFilteredByCategory(byCategory);
        // setFilteredByCategory(selected === "all" ? cards : filtered) 
        setSelectedCategory(selected);
    }

    // conditional rendering - if no dishes display an empty page
    if (filteredByCategory.length === 0) return <p>No dishes in menu</p>;

    return (
        <>
            <Title text="Order Delivery or Takeaway" />

            <div className="d-flex justify-content-between px-5">
                <div className="d-flex align-items-center">
                    <label className="pe-2">Category:</label>
                    <select onChange={(e) => categoryChange(e.target.value)}
                        value={selectedCategory} className="form-select text-capitalize">
                        {
                            categories.map((category) =>
                                <option key={category} value={category}>{category}</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <button onClick={(e) => changeDisplay('list')} className="btn btn-default">
                        <i className="bi-list-ul"></i>
                    </button>
                    <button onClick={(e) => changeDisplay('grid')} className="btn btn-default">
                        <i className="bi-grid-3x3-gap-fill"></i>
                    </button>
                </div>
            </div>

            <div className={display}>
                {
                    filteredByCategory.map((card) =>
                        <Card
                            key={card._id}
                            data={card}
                            categoryChange={categoryChange} />
                    )
                }
            </div>
        </>
    );

}

export default Menu;