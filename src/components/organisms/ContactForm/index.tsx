import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { Contact, ContactType } from "@/types/contact";

type FormInputs = {
    type: ContactType;
    value: string;
    description: string;
}

interface ContactFormProps {
    onSubmit: (data: Omit<Contact, 'id'>) => void;
    editingContact?: Contact | null;
}

const ContactForm: FC<ContactFormProps> = ({ onSubmit, editingContact }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>({
        defaultValues: {
            type: editingContact?.type || ContactType.Phone,
            value: editingContact?.value || '',
            description: editingContact?.description || '',
        }
    });

    useEffect(() => {
        if (editingContact) {
            reset(editingContact);
        }
    }, [editingContact, reset]);

    const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
        onSubmit(data);
    };

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* тип контакта */}
            <Form.Group className="mb-3" controlId="contactType">
                <Form.Label>Тип</Form.Label>
                <Form.Select
                    {...register("type", { required: "Это поле обязательное" })}
                    isInvalid={!!errors.type}
                >
                    {/* генерируем опции выбора из поля enum ContactType */}
                    {Object.values(ContactType).map((type) => {
                        return (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        )
                    })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.type?.message}
                </Form.Control.Feedback>
            </Form.Group>

            {/* поле контакт */}
            <Form.Group className="mb-3" controlId="contactValue">
                <Form.Label>Контакт</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите email, телефон и т.д"
                    {...register("value", { required: "Это поле обязательное" })}
                    isInvalid={!!errors.value}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.value?.message}
                </Form.Control.Feedback>
            </Form.Group>

            {/* поле с описанием */}
            <Form.Group className="mb-3" controlId="contactDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Описание"
                    {...register("description")}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Сохранить
            </Button>
        </Form>
    );
};

export default ContactForm;