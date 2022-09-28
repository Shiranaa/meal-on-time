import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../services/apiService";
import { CardType } from "../Card/Card";
import Title from "../Title/Title";
import UpdateForm from "./UpdateForm";


function UpdateItem() {
    const { id } = useParams();
    const [card, setCard] = useState<CardType>();
    const [name, setName] = useState<string>('');


    useEffect(() => {
        const res = getRequest(`cards/${id}`);
        if (!res) {
            return;
        }

        res.then(res => res.json())
            .then(card => {
                setCard(card);
                setName(card.name);
            })
    }, [id]);



    return (
        <>
            <Title text="Update Your Dish">
                <small className="text-muted d-block">
                    {name}
                </small>
            </Title>

            {
                card &&
                <UpdateForm card={card} />
            }

        </>
    );
}

export default UpdateItem;