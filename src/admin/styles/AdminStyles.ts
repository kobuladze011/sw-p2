import styled from 'styled-components';

export const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const AdminHeader = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const AdminNav = styled.nav`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
`;

export const NavLink = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  background: ${(props) => (props.$active ? '#007bff' : '#fff')};
  color: ${(props) => (props.$active ? '#fff' : '#333')};
  border: 1px solid ${(props) => (props.$active ? '#007bff' : '#ddd')};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.$active ? '#0056b3' : '#e9ecef')};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background: #007bff;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:hover {
    background: #e9ecef;
  }
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
`;

export const TableCell = styled.td`
  padding: 15px;
  border-top: 1px solid #dee2e6;
`;

export const Button = styled.button<{
  $variant?: 'primary' | 'danger' | 'success';
}>`
  padding: 8px 16px;
  margin-right: 8px;
  background: ${(props) => {
    switch (props.$variant) {
      case 'danger':
        return '#dc3545';
      case 'success':
        return '#28a745';
      default:
        return '#007bff';
    }
  }};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Form = styled.form`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const Badge = styled.span<{ $variant?: 'success' | 'danger' }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${(props) =>
    props.$variant === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${(props) => (props.$variant === 'success' ? '#155724' : '#721c24')};
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;
