import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import UserProfileSection from '../components/UserProfileSection';
import BadgesOverviewPanel from '../components/BadgesOverviewPanel';
import CommitmentsSection from '../components/CommitmentsSection';
import AccomplishmentsOverviewPanel from '../components/AccomplishmentsOverviewPanel';
import YourStatisticsPanel from '../components/YourStatisticsPanel';
import { exportToCsv, exportToXlsx } from '../utils/exportUtils'; // Import export utilities

const CommitmentPortfolio: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<'regular' | 'table'>('regular');

  // Consolidated source for all my promises, including those that might become badges or unkept
  const allMyPromisesSource = [
    {
      id: 100,
      title: 'Weekly Progress Check-in',
      dueDate: dayjs().subtract(1, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(4, 'day').hour(9).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will provide a weekly progress update.',
      assignee: 'Alex Johnson',
      type: 'nudge',
      nudgesLeft: 8,
      totalNudges: 12,
      questions: [
        '1. What have you accomplished so far this week?',
        '2. What do you plan to accomplish/complete by the end of the week?',
        '3. What are you concerned about that might hinder your progress?',
      ],
      responses: [
        { date: dayjs().subtract(1, 'day').format('MMM D, YYYY'), answer: 'Completed tasks A, B, C. Planning to finish D and E. Concerned about resource allocation for F.' },
        { date: dayjs().subtract(8, 'day').format('MMM D, YYYY'), answer: 'Finished initial setup for project X. Next, I will start coding module Y. No major concerns at the moment.' },
        { date: dayjs().subtract(15, 'day').format('MMM D, YYYY'), answer: 'Successfully onboarded new team member. Will focus on documentation next. Minor delay due to software update.' },
        { date: dayjs().subtract(22, 'day').format('MMM D, YYYY'), answer: 'Reviewed client feedback and integrated changes. Preparing for next sprint. Need clarification on feature Z.' },
      ],
    },
    {
      id: 99,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(5, 'day').hour(14).minute(15).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(8, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(4, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will submit the Q3 project proposal.',
      assignee: 'Chris Parker',
    },
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').hour(11).minute(45).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(6, 'day').hour(16).minute(20).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I am going to provide feedback on new product designs.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Attendance',
      dueDate: dayjs().subtract(7, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(10, 'day').hour(13).minute(5).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(6, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will deliver the quarterly marketing report with all KPIs and campaign results. This report needs to be exceptionally detailed, covering all aspects of our Q2 performance and providing actionable insights for the next quarter\'s strategy.',
      assignee: 'Jamie Smith',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      dueDate: dayjs().add(3, 'day').hour(18).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(5, 'day').hour(11).minute(10).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will complete the code review for the new feature branch.',
      assignee: 'Alex Johnson',
    },
    {
      id: 7,
      title: 'Teamwork',
      dueDate: dayjs().add(4, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(9, 'day').hour(15).minute(40).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I plan to prepare and share the agenda for the upcoming sprint planning meeting. It must include time slots for each topic and a list of pre-reading materials for all attendees.',
      assignee: 'Sarah Connor',
    },
    {
      id: 8,
      title: 'Attendance',
      dueDate: dayjs().subtract(5, 'day').hour(8).minute(15).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(7, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will join the all-hands meeting on time.',
      assignee: 'Mike Miller',
    },
    {
      id: 12,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(6, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(11, 'day').hour(9).minute(45).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(5, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will finalize the budget proposal.',
      assignee: 'Chris Parker',
    },
    {
      id: 13,
      title: 'Teamwork',
      dueDate: dayjs().add(7, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(17).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I am going to onboard the new team member.',
      assignee: 'Riley Chen',
    },
    {
      id: 14,
      title: 'Attendance',
      dueDate: dayjs().add(8, 'day').hour(10).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(13, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will attend the weekly project sync.',
      assignee: 'Jamie Smith',
    },
    {
      id: 15,
      title: 'Promise Kept General',
      dueDate: dayjs().add(1, 'day').hour(23).minute(59).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(3, 'day').hour(21).minute(59).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will complete the full security audit report for the main application by the end of the week, identifying all critical and high-priority vulnerabilities and recommending actionable mitigation strategies to the security team.',
      assignee: 'Alex Johnson',
    },
    {
      id: 16,
      title: 'Leadership',
      dueDate: dayjs().add(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(14, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will lead the brainstorming session.',
      assignee: 'Sarah Connor',
    },
    {
      id: 17,
      title: 'Promise Kept General',
      dueDate: dayjs().add(10, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(15, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I am going to review new UI/UX designs.',
      assignee: 'Mike Miller',
    },
    {
      id: 18,
      title: 'Attendance',
      dueDate: dayjs().add(11, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(16, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will be present for the client demo call.',
      assignee: 'Chris Parker',
    },
    {
      id: 19,
      title: 'Teamwork',
      dueDate: dayjs().add(12, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(17, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will help debug the critical production issue.',
      assignee: 'Riley Chen',
    },
    {
      id: 20,
      title: 'Promise Kept General',
      dueDate: dayjs().add(13, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will prepare the quarterly business review (QBR) presentation for all key stakeholders, summarizing our major achievements, the challenges we faced, and the strategic roadmap for the next two quarters.',
      assignee: 'Jamie Smith',
    },
    {
      id: 21,
      title: 'Attendance',
      dueDate: dayjs().add(14, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(19, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will attend the company-wide training session on new software tools.',
      assignee: 'Alex Johnson',
    },
    {
      id: 22,
      title: 'Promise Kept General',
      dueDate: dayjs().add(15, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I plan to update the project roadmap document.',
      assignee: 'Sarah Connor',
    },
    {
      id: 23,
      title: 'Teamwork',
      dueDate: dayjs().add(16, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(21, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will provide constructive feedback during the peer code review session.',
      assignee: 'Mike Miller',
    },
    {
      id: 24,
      title: 'Promise Kept General',
      dueDate: dayjs().add(17, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(22, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will research and propose new technologies for our backend infrastructure.',
      assignee: 'Chris Parker',
    },
    {
      id: 25,
      title: 'Attendance',
      dueDate: dayjs().add(18, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(23, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will participate actively in the daily stand-up meetings.',
      assignee: 'Riley Chen',
    },
    {
      id: 26,
      title: 'Promise Kept General',
      dueDate: dayjs().add(19, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(24, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I am going to prepare and deliver a presentation on recent industry trends.',
      assignee: 'Jamie Smith',
    },
    {
      id: 27,
      title: 'Teamwork',
      dueDate: dayjs().add(20, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will assist the QA team in testing the new features before release.',
      assignee: 'Alex Johnson',
    },
    {
      id: 28,
      title: 'Promise Kept General',
      dueDate: dayjs().add(21, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(26, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will document the new API endpoints for external developers.',
      assignee: 'Sarah Connor',
    },
    {
      id: 29,
      title: 'Attendance',
      dueDate: dayjs().add(22, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will attend the weekly leadership meeting and provide updates on my team\'s progress.',
      assignee: 'Mike Miller',
    },
    {
      id: 30,
      title: 'Promise Kept General',
      dueDate: dayjs().add(23, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(28, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will review and approve the new marketing collateral.',
      assignee: 'Chris Parker',
    },
    {
      id: 31,
      title: 'Teamwork',
      dueDate: dayjs().add(24, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will collaborate with the sales team to develop new client proposals.',
      assignee: 'Riley Chen',
    },
    {
      id: 32,
      title: 'Promise Kept General',
      dueDate: dayjs().add(25, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(30, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will prepare a detailed report on customer feedback and suggestions.',
      assignee: 'Jamie Smith',
    },
    {
      id: 33,
      title: 'Attendance',
      dueDate: dayjs().add(26, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(31, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will ensure timely attendance at all scheduled client meetings.',
      assignee: 'Alex Johnson',
    },
    {
      id: 34,
      title: 'Promise Kept General',
      dueDate: dayjs().add(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(32, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will conduct a training session for new employees on our internal tools.',
      assignee: 'Sarah Connor',
    },
    {
      id: 35,
      title: 'Teamwork',
      dueDate: dayjs().add(28, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(33, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will assist in organizing the company\'s annual team-building event.',
      assignee: 'Mike Miller',
    },
    {
      id: 36,
      title: 'Promise Kept General',
      dueDate: dayjs().add(29, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(34, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will develop and implement a new feature for the mobile application.',
      assignee: 'Chris Parker',
    },
    {
      id: 37,
      title: 'Attendance',
      dueDate: dayjs().add(30, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will attend the industry conference to gather insights on emerging trends.',
      assignee: 'Riley Chen',
    },
    {
      id: 38,
      title: 'Promise Kept General',
      dueDate: dayjs().add(31, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(36, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will prepare a detailed financial forecast for the next fiscal year.',
      assignee: 'Jamie Smith',
    },
    {
      id: 39,
      title: 'Teamwork',
      dueDate: dayjs().add(32, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(37, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will collaborate with cross-functional teams to streamline our workflow.',
      assignee: 'Alex Johnson',
    },
    {
      id: 40,
      title: 'Promise Kept General',
      dueDate: dayjs().add(33, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(38, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will conduct a thorough market analysis for our new product launch.',
      assignee: 'Sarah Connor',
    },
    {
      id: 41,
      title: 'Attendance',
      dueDate: dayjs().add(34, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(39, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will ensure my presence at all mandatory company-wide meetings.',
      assignee: 'Mike Miller',
    },
    {
      id: 42,
      title: 'Promise Kept General',
      dueDate: dayjs().add(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(40, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will design and implement a new database schema for improved performance.',
      assignee: 'Chris Parker',
    },
    {
      id: 43,
      title: 'Teamwork',
      dueDate: dayjs().add(36, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(41, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will provide support to colleagues facing technical challenges.',
      assignee: 'Riley Chen',
    },
    {
      id: 44,
      title: 'Promise Kept General',
      dueDate: dayjs().add(37, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(42, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will prepare a detailed report on the effectiveness of our recent marketing campaigns.',
      assignee: 'Jamie Smith',
    },
    {
      id: 45,
      title: 'Attendance',
      dueDate: dayjs().add(38, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will attend all scheduled client presentations and contribute to discussions.',
      assignee: 'Alex Johnson',
    },
    {
      id: 46,
      title: 'Promise Kept General',
      dueDate: dayjs().add(39, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(44, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will develop and deploy a new microservice to enhance system scalability.',
      assignee: 'Sarah Connor',
    },
    {
      id: 47,
      title: 'Teamwork',
      dueDate: dayjs().add(40, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(45, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will actively participate in team discussions and contribute innovative ideas.',
      assignee: 'Mike Miller',
    },
    {
      id: 48,
      title: 'Promise Kept General',
      dueDate: dayjs().add(41, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(46, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will conduct a thorough review of all legal documents related to new partnerships.',
      assignee: 'Chris Parker',
    },
    {
      id: 49,
      title: 'Attendance',
      dueDate: dayjs().add(42, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(47, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will ensure my presence at all critical project review meetings.',
      assignee: 'Riley Chen',
    },
    {
      id: 50,
      title: 'Promise Kept General',
      dueDate: dayjs().add(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(48, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: undefined, // This is an active promise
      description: 'I will prepare a comprehensive report on our competitive landscape.',
      assignee: 'Jamie Smith',
    },
  ];

  const myUnkeptPromisesItems = [
    {
      id: 9,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(20, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I promised to deliver the final report on the agreed-upon deadline, including all necessary data and analysis.',
      assignee: 'John Doe',
    },
    {
      id: 10,
      title: 'Attendance',
      dueDate: dayjs().subtract(15, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I committed to attending the critical client call.',
      assignee: 'Jane Smith',
    },
    {
      id: 11,
      title: 'Teamwork',
      dueDate: dayjs().subtract(10, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(9).minute(15).format('MMM D, YYYY, hh:mm A'),
      description: 'I was going to provide the necessary assets for the marketing campaign, ensuring they were high-quality and on brand.',
      assignee: 'Peter Jones',
    },
  ];

  // Filter active promises (not unkept, and not yet approved)
  const activePromisesItems = allMyPromisesSource.filter(item => 
    !item.approvedDate && !myUnkeptPromisesItems.some(unkept => unkept.id === item.id)
  );

  // Filter completed promises (have an approvedDate)
  const myBadgesItems = allMyPromisesSource.filter(item => !!item.approvedDate);

  const myCommitmentsTabs = [
    {
      label: 'Active Promises',
      count: activePromisesItems.length,
      items: activePromisesItems,
    },
    {
      label: 'My Badges', // Renamed from 'My Promises'
      count: myBadgesItems.length,
      items: myBadgesItems,
    },
    {
      label: 'My Unkept Promises',
      count: myUnkeptPromisesItems.length,
      items: myUnkeptPromisesItems,
    },
  ];

  const commitmentsReceivedTabs = [
    {
      label: 'Promises Owed to Me',
      count: 2,
      items: [
        {
          id: 1,
          title: 'Teamwork',
          dueDate: dayjs().subtract(2, 'day').format('MMM D, YYYY, hh:mm A'),
          committedDate: dayjs().subtract(5, 'day').format('MMM D, YYYY, hh:mm A'),
          description: 'I will provide feedback on the new product design mockups for client presentation, focusing on usability and aesthetic appeal.',
          assignee: 'Riley Chen',
        },
        {
          id: 2,
          title: 'Promise Kept General',
          dueDate: dayjs().subtract(4, 'day').format('MMM D, YYYY, hh:mm A'),
          committedDate: dayjs().subtract(7, 'day').format('MMM D, YYYY, hh:mm A'),
          description: 'I am going to deliver the quarterly marketing report with all KPIs and campaign results, highlighting key achievements and areas for improvement.',
          assignee: 'Jamie Smith',
        },
      ],
    },
    {
      label: 'Badges Issued',
      count: 120,
      items: [],
    },
    {
      label: 'Unkept Promises to Me',
      count: 31,
      items: [],
    },
  ];

  // Function to get all commitments from the "My Promises" tab for export
  const getMyPromisesDataForExport = () => {
    // For export, we should probably export all promises, or just the 'My Badges' ones if that's the new 'My Promises' equivalent
    // Given the request, 'My Badges' is the new 'My Promises' in terms of content.
    return myBadgesItems; // Exporting the content of the new 'My Badges' tab
  };

  const handleExportCsv = () => {
    const dataToExport = getMyPromisesDataForExport();
    exportToCsv(dataToExport, 'My_Badges'); // Changed filename to reflect new tab name
  };

  const handleExportXlsx = () => {
    const dataToExport = getMyPromisesDataForExport();
    exportToXlsx(dataToExport, 'My_Badges'); // Changed filename to reflect new tab name
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <NavigationTabs />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <UserProfileSection
          name="Alex Johnson"
          phone="+1 (555) 123-4567"
          onExportCsv={handleExportCsv}
          onExportXlsx={handleExportXlsx}
          showExportOptions={true}
        />

        <Grid container spacing={3}>
          {/* Accomplishments Overview */}
          <Grid item xs={12} md={6}>
            <AccomplishmentsOverviewPanel />
          </Grid>

          {/* Your Statistics Panel */}
          <Grid item xs={12} md={6}>
            <YourStatisticsPanel />
          </Grid>

          {/* Badges Overview */}
          <Grid item xs={12} sx={{ mb: 3 }}>
            <BadgesOverviewPanel />
          </Grid>

          {/* My Commitments */}
          <Grid item xs={12}>
            <CommitmentsSection
              title="My Commitments"
              tabs={myCommitmentsTabs}
              displayMode={displayMode}
              onToggleDisplayMode={setDisplayMode}
              showClearAllFilters={true}
              isActionsPage={false}
              isCommitmentPortfolioPage={true}
            />
          </Grid>

          {/* Commitments to Others */}
          <Grid item xs={12}>
            <CommitmentsSection
              title="Others' Commitments"
              tabs={commitmentsReceivedTabs}
              displayMode="regular"
              showClearAllFilters={true}
              isActionsPage={false}
              isCommitmentPortfolioPage={true}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CommitmentPortfolio;