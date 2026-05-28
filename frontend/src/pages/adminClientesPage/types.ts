import { Client } from '../../api/types';

export interface AdminClientesPageViewProps {
  clients: Client[];
  loading: boolean;
  errorMessage: string | null;
  onClearError: () => void;
}
