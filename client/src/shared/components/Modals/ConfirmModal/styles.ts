import styled from 'styled-components';

import { font } from '@/shared/utils/styles';
import Modal from '@/shared/components/Modals/Modal';
import Input from '@/shared/components/Inputs/Input';
import Button from '@/shared/components/Button';

export const StyledConfirmModalComponent = styled(Modal)`
  padding: 45px 50px 50px;
`;

export const Title = styled.div`
  padding-bottom: 25px;
  ${font.bold}
  ${font.size(24)}
	line-height: 1.5;
`;

export const Message = styled.p`
  padding-bottom: 25px;
  white-space: pre-wrap;
  ${font.size(16)}
`;

export const InputLabel = styled.div`
  padding-bottom: 12px;
  ${font.size(16)}
  ${font.bold}
`;

export const StyledInputComponent = styled(Input)`
  margin-bottom: 25px;
  min-width: 220px;
`;

export const StyledButtonComponent = styled(Button)`
  margin: 5px 20px 0 0;
`;
