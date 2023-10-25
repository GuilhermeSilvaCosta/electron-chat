import { formatDistanceToNow } from 'date-fns'


import { Timestamp } from '../db/firestore';

export const createTimestamp = () => 
  Timestamp.now().toMillis().toString();

export const formatTimeAgo = timestamp => {
  const date = new Date(parseInt(timestamp));
  return formatDistanceToNow(date, { addSuffix: true });
}