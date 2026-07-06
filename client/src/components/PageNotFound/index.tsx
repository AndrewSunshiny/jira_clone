import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Avatar, Spinner } from '@/shared/components';
import { Input, DatePicker, Select, Textarea } from '@/shared/components/Inputs';
import { Modal, ConfirmModal } from '@/shared/components/Modals';
import { Wrapper, Heading, Message } from './styles';

const PageNotFound = () => {
  const [stateDateValue, setDateValue] = useState(null);
  const [stateInputValue, setInputValue] = useState('');
  const [stateIsModalOpen, setIsModalOpen] = useState(false);
  const [stateSelectValue, setSelectValue] = useState('');
  const [stateSelectOptions, setSelectOptions] = useState([
    { label: 'one', value: '1' },
    { label: 'two', value: '2' },
    { label: 'three', value: '3' },
    { label: 'four', value: '4' },
    { label: 'five', value: '5' },
    { label: 'six', value: '6' },
    { label: 'seven', value: '7' },
    { label: 'eight', value: '8' },
    { label: 'nine', value: '9' },
    { label: 'ten', value: '10' },
  ]);

  return (
    <Wrapper>
      <Heading>404</Heading>
      <Message>We cannot find the page you are looking for.</Message>
      <div style={{ textAlign: 'left' }}>
        <Avatar name="Name Surname" size={40} />
        <ConfirmModal
          renderLink={(modal) => <Button onClick={modal.open}>Yo</Button>}
          confirmInput="YAY"
          onConfirm={(modal) => {
            console.log('confirmed');
            modal.close();
          }}
        />
        <DatePicker placeholder="Select date" value={stateDateValue} onChange={setDateValue} />
        <Input
          placeholder="Input"
          value={stateInputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Textarea
          placeholder="Textarea"
          value={stateInputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={stateIsModalOpen}
          onClose={() => setIsModalOpen(false)}
          renderLink={(modal) => <Button onClick={modal.open}>Open Modal</Button>}
          renderContent={(modal) => (
            <>
              <h1>Nice modal bro</h1>
              <h1>Nice modal bro</h1>
              <Button onClick={modal.close}>Close</Button>
              <Modal
                renderLink={(innerModal) => <Button onClick={innerModal.open}>Open Modal</Button>}
                renderContent={(innerModal) => (
                  <>
                    <h1>Nice innerModal bro</h1>
                    <Button onClick={innerModal.close}>Close</Button>
                  </>
                )}
              />
            </>
          )}
        />
        <Select
          isMulti
          value={stateSelectValue}
          options={stateSelectOptions}
          placeholder="Type to search"
          onChange={setSelectValue}
          onCreate={(newOptionName: string, selectOptionValue) => {
            setTimeout(() => {
              setSelectOptions([
                ...stateSelectOptions,
                { label: newOptionName, value: newOptionName },
              ]);
              selectOptionValue(newOptionName);
            }, 1000);
          }}
        />
        <Spinner />
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default PageNotFound;
