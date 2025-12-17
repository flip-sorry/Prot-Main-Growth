export type DocumentStatus = 
  | 'Draft' 
  | 'Sent' 
  | 'Viewed' 
  | 'Awaiting approval' 
  | 'To approve' 
  | 'To sign' 
  | 'Waiting for payment' 
  | 'Completed' 
  | 'Paid' 
  | 'Rejected' 
  | 'Delivery failure';

export interface Document {
  id: string;
  title: string;
  participants: string[];
  status: DocumentStatus;
  amount: number;
  date: string;
  avatarText: string;
}

export interface Tab {
  id: string;
  label: string;
  count: number;
  active?: boolean;
}

export interface Workspace {
  name: string;
  type: string;
  members: number;
  iconColor: string;
}

