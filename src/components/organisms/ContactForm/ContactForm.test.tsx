import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './index';
import { ContactType } from '@/types/contact';

describe('ContactForm', () => {
    //проверка первоначального рендера
    it('should render all from fields and the submit button', () => {
        const mockOnSubmit = jest.fn();
        render(<ContactForm onSubmit={mockOnSubmit} />);
        expect(screen.getByLabelText(/тип/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/контакт/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/описание/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument();
    })
    //успешная отправка формы
    it('should call onSubmit with form data when submitted correctly', async () => {
        const mockOnSubmit = jest.fn();
        render(<ContactForm onSubmit={mockOnSubmit} />);
        
        const user = userEvent.setup();

        const typeSelect = screen.getByLabelText(/тип/i);
        const valueInput = screen.getByLabelText(/контакт/i);
        const descriptionInput = screen.getByLabelText(/описание/i);
        const submitButton = screen.getByRole('button', { name: /сохранить/i });

        await user.selectOptions(typeSelect, ContactType.Email);
        await user.type(valueInput, 'test@example.com');
        await user.type(descriptionInput, 'Тестовое описание');
        await user.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        
        expect(mockOnSubmit).toHaveBeenCalledWith({
        type: ContactType.Email,
        value: 'test@example.com',
        description: 'Тестовое описание',
        });
    });
    //ошибки валидации
    it('should display validation errors when required fields are empty on submit', async () => {
        const mockOnSubmit = jest.fn();
        render(<ContactForm onSubmit={mockOnSubmit} />);

        const user = userEvent.setup();
        const submitButton = screen.getByRole('button', { name: /сохранить/i });
        await user.click(submitButton);

        expect(await screen.findByText('Это поле обязательное')).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });
})


