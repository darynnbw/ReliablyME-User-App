export interface GroupOption {
  name: string;
  members: string[];
}

export const groupMembersMap: { [key: string]: string[] } = {
  'Development Team': ['Alex Johnson', 'Riley Chen'],
  'Customer Facing Team': ['Chris Parker', 'Jamie Smith'],
  'Official co-op': ['Sarah Connor', 'Mike Miller'],
  'Part-timers': ['John Doe', 'Jane Smith'],
};

export const groupOptions: GroupOption[] = [
  { name: 'Development team', members: groupMembersMap['Development Team'] },
  { name: 'Customer facing team', members: groupMembersMap['Customer Facing Team'] },
  { name: 'Official co-op', members: groupMembersMap['Official co-op'] },
  { name: 'Part-timers', members: groupMembersMap['Part-timers'] },
];