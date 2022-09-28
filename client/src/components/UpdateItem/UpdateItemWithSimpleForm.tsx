import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../../services/apiService";
import { CardType } from "../Card/Card";
import Title from "../Title/Title";


function UpdateItem() {
    const { id } = useParams();
    const [card, setCard] = useState<CardType>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const navigate = useNavigate();

    const [errMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        const res = getRequest(`cards/${id}`);
        if (!res) {
            return;
        }

        res.then(res => res.json())
            .then(card => {
                console.log(card);

                setCard(card);
                setName(card.name);
                setDescription(card.description);
                setPrice(card.price);
            })
    }, [id]);

    function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        const res = patchRequest(`cards/${card?._id}`, {
            name,
            description,
            price,
        });

        if (!res) {
            return;
        }

        res.then(res => {
            if (res.ok) {
                navigate('/');
                setErrorMsg('');
            }
            else {
                console.error('something went wrong');
                setErrorMsg('something went wrong');
            }

        })
    }

    function isEnabled(): boolean {
        return name.length > 3 && price > 0;
    }

    return (
        <>
            <Title text="Update Your Dish">
                {
                    card &&
                    <small className="text-muted d-block">
                        {card.name}
                    </small>
                }
            </Title>


            {
                errMsg.length > 0 &&
                <div className="alert alert-danger">
                    {errMsg}
                </div>
            }


            {
                card &&


                <form>

                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(+e.target.value)}
                        />
                    </div>

                    <input
                        value="Update"
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!isEnabled()}
                    />

                </form>
            }
        </>
    );
}

export default UpdateItem;