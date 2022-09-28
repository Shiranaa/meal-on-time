import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchRequest } from "../../services/apiService";
import { CardType } from "../Card/Card";
import { IErrors } from "../auth/Login";

interface Props {
    card: CardType;
}

function UpdateForm(props: Props) {
    const navigate = useNavigate();
    const [errMsg, setErrorMsg] = useState<string>('');
    const card = props.card;

    function handleSubmit(values: CardType) {
        const res = patchRequest(`cards/${card._id}`, values);

        if (!res) {
            return;
        }

        res.then(res => {
            if (res.ok) {
                navigate('/');
                setErrorMsg('');
            }
            else {
                setErrorMsg('something went wrong');
            }
        })
    }

    function validate(values: CardType): IErrors {
        const errors: IErrors = {};

        if (values.name.length < 4) {
            errors.name = 'invalid name';
        }
        if (values.price < 1) {
            errors.price = 'invalid price';
        }

        return errors;
    }

    return (
        <>
            {
                errMsg.length > 0 &&
                <div className="alert alert-danger">
                    {errMsg}
                </div>
            }

            <Formik
                initialValues={card}
                validate={validate}
                onSubmit={(values => handleSubmit(values))}
            >
                {
                    ({
                        values,
                        handleChange,
                        handleSubmit,
                        setValues,
                        isSubmitting,
                        dirty,
                        isValid,
                        errors
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {
                                errors.name ? (
                                    <div className="text-danger">
                                        {errors.name}</div>
                                ) : null
                            }

                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                />
                            </div>
                            {
                                errors.price ? (
                                    <div className="text-danger">
                                        {errors.price}</div>
                                ) : null
                            }

                            <input
                                value="Update"
                                type="submit"
                                className="btn btn-primary"
                                disabled={!(dirty && isValid) || isSubmitting}
                            />

                        </form>
                    )
                }
            </Formik>
        </>
    );
}

export default UpdateForm;