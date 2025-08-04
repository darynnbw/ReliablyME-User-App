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

  const myPromisesItems = [
    {
      id: 100,
      title: 'Weekly Progress Check-in',
      dueDate: dayjs().subtract(1, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(4, 'day').hour(9).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(1, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Weekly progress update.',
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
      description: 'Submit the Q3 project proposal.',
      assignee: 'Chris Parker',
    },
    {
      id: 1,
      title: 'Teamwork',
      dueDate: dayjs().add(2, 'day').hour(11).minute(45).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(6, 'day').hour(16).minute(20).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(3, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Provide feedback on new product designs.',
      assignee: 'Riley Chen',
    },
    {
      id: 2,
      title: 'Attendance',
      dueDate: dayjs().subtract(7, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(10, 'day').hour(13).minute(5).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(6, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Deliver the quarterly marketing report with all KPIs and campaign results. This report needs to be exceptionally detailed, covering all aspects of our Q2 performance and providing actionable insights for the next quarter\'s strategy.',
      assignee: 'Jamie Smith',
    },
    {
      id: 6,
      title: 'Promise Kept General',
      dueDate: dayjs().add(3, 'day').hour(18).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(5, 'day').hour(11).minute(10).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Complete code review for the new feature branch.',
      assignee: 'Alex Johnson',
    },
    {
      id: 7,
      title: 'Teamwork',
      dueDate: dayjs().add(4, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(9, 'day').hour(15).minute(40).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(5, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare and share the agenda for the upcoming sprint planning meeting. It must include time slots for each topic and a list of pre-reading materials for all attendees.',
      assignee: 'Sarah Connor',
    },
    {
      id: 8,
      title: 'Attendance',
      dueDate: dayjs().subtract(5, 'day').hour(8).minute(15).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(7, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(4, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Join the all-hands meeting on time.',
      assignee: 'Mike Miller',
    },
    {
      id: 12,
      title: 'Promise Kept General',
      dueDate: dayjs().subtract(6, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(11, 'day').hour(9).minute(45).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().subtract(5, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Finalize the budget proposal.',
      assignee: 'Chris Parker',
    },
    {
      id: 13,
      title: 'Teamwork',
      dueDate: dayjs().add(7, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(12, 'day').hour(17).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(8, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Onboard the new team member.',
      assignee: 'Riley Chen',
    },
    {
      id: 14,
      title: 'Attendance',
      dueDate: dayjs().add(8, 'day').hour(10).minute(30).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(13, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Attend the weekly project sync.',
      assignee: 'Jamie Smith',
    },
    {
      id: 15,
      title: 'Promise Kept General',
      dueDate: dayjs().add(1, 'day').hour(23).minute(59).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(3, 'day').hour(21).minute(59).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(2, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'I will complete the full security audit report for the main application by the end of the week, identifying all critical and high-priority vulnerabilities and recommending actionable mitigation strategies to the security team.',
      assignee: 'Alex Johnson',
    },
    {
      id: 16,
      title: 'Leadership',
      dueDate: dayjs().add(9, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(14, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(10, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Lead the brainstorming session.',
      assignee: 'Sarah Connor',
    },
    {
      id: 17,
      title: 'Promise Kept General',
      dueDate: dayjs().add(10, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(15, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(11, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Review new UI/UX designs.',
      assignee: 'Mike Miller',
    },
    {
      id: 18,
      title: 'Attendance',
      dueDate: dayjs().add(11, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(16, 'day').hour(8).minute(30).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(12, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Be present for the client demo call.',
      assignee: 'Chris Parker',
    },
    {
      id: 19,
      title: 'Teamwork',
      dueDate: dayjs().add(12, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(17, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(13, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Help debug the critical production issue.',
      assignee: 'Riley Chen',
    },
    {
      id: 20,
      title: 'Promise Kept General',
      dueDate: dayjs().add(13, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(18, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(14, 'day').hour(18).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare the quarterly business review (QBR) presentation for all key stakeholders, summarizing our major achievements, the challenges we faced, and the strategic roadmap for the next two quarters.',
      assignee: 'Jamie Smith',
    },
    {
      id: 21,
      title: 'Attendance',
      dueDate: dayjs().add(14, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(19, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(15, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Attend the company-wide training session on new software tools.',
      assignee: 'Alex Johnson',
    },
    {
      id: 22,
      title: 'Promise Kept General',
      dueDate: dayjs().add(15, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(20, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(16, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Update the project roadmap document.',
      assignee: 'Sarah Connor',
    },
    {
      id: 23,
      title: 'Teamwork',
      dueDate: dayjs().add(16, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(21, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(17, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Provide constructive feedback during the peer code review session.',
      assignee: 'Mike Miller',
    },
    {
      id: 24,
      title: 'Promise Kept General',
      dueDate: dayjs().add(17, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(22, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(18, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Research and propose new technologies for our backend infrastructure.',
      assignee: 'Chris Parker',
    },
    {
      id: 25,
      title: 'Attendance',
      dueDate: dayjs().add(18, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(23, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(19, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Participate actively in the daily stand-up meetings.',
      assignee: 'Riley Chen',
    },
    {
      id: 26,
      title: 'Promise Kept General',
      dueDate: dayjs().add(19, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(24, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(20, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare and deliver a presentation on recent industry trends.',
      assignee: 'Jamie Smith',
    },
    {
      id: 27,
      title: 'Teamwork',
      dueDate: dayjs().add(20, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(25, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(21, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Assist the QA team in testing the new features before release.',
      assignee: 'Alex Johnson',
    },
    {
      id: 28,
      title: 'Promise Kept General',
      dueDate: dayjs().add(21, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(26, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(22, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Document the new API endpoints for external developers.',
      assignee: 'Sarah Connor',
    },
    {
      id: 29,
      title: 'Attendance',
      dueDate: dayjs().add(22, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(23, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Attend the weekly leadership meeting and provide updates on my team\'s progress.',
      assignee: 'Mike Miller',
    },
    {
      id: 30,
      title: 'Promise Kept General',
      dueDate: dayjs().add(23, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(28, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(24, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Review and approve the new marketing collateral.',
      assignee: 'Chris Parker',
    },
    {
      id: 31,
      title: 'Teamwork',
      dueDate: dayjs().add(24, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(29, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(25, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Collaborate with the sales team to develop new client proposals.',
      assignee: 'Riley Chen',
    },
    {
      id: 32,
      title: 'Promise Kept General',
      dueDate: dayjs().add(25, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(30, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(26, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare a detailed report on customer feedback and suggestions.',
      assignee: 'Jamie Smith',
    },
    {
      id: 33,
      title: 'Attendance',
      dueDate: dayjs().add(26, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(31, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Ensure timely attendance at all scheduled client meetings.',
      assignee: 'Alex Johnson',
    },
    {
      id: 34,
      title: 'Promise Kept General',
      dueDate: dayjs().add(27, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(32, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(28, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Conduct a training session for new employees on our internal tools.',
      assignee: 'Sarah Connor',
    },
    {
      id: 35,
      title: 'Teamwork',
      dueDate: dayjs().add(28, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(33, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(29, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Assist in organizing the company\'s annual team-building event.',
      assignee: 'Mike Miller',
    },
    {
      id: 36,
      title: 'Promise Kept General',
      dueDate: dayjs().add(29, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(34, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(30, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Develop and implement a new feature for the mobile application.',
      assignee: 'Chris Parker',
    },
    {
      id: 37,
      title: 'Attendance',
      dueDate: dayjs().add(30, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(31, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Attend the industry conference to gather insights on emerging trends.',
      assignee: 'Riley Chen',
    },
    {
      id: 38,
      title: 'Promise Kept General',
      dueDate: dayjs().add(31, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(36, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(32, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare a detailed financial forecast for the next fiscal year.',
      assignee: 'Jamie Smith',
    },
    {
      id: 39,
      title: 'Teamwork',
      dueDate: dayjs().add(32, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(37, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(33, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Collaborate with cross-functional teams to streamline our workflow.',
      assignee: 'Alex Johnson',
    },
    {
      id: 40,
      title: 'Promise Kept General',
      dueDate: dayjs().add(33, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(38, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(34, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Conduct a thorough market analysis for our new product launch.',
      assignee: 'Sarah Connor',
    },
    {
      id: 41,
      title: 'Attendance',
      dueDate: dayjs().add(34, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(39, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Ensure my presence at all mandatory company-wide meetings.',
      assignee: 'Mike Miller',
    },
    {
      id: 42,
      title: 'Promise Kept General',
      dueDate: dayjs().add(35, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(40, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(36, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Design and implement a new database schema for improved performance.',
      assignee: 'Chris Parker',
    },
    {
      id: 43,
      title: 'Teamwork',
      dueDate: dayjs().add(36, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(41, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(37, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Provide support to colleagues facing technical challenges.',
      assignee: 'Riley Chen',
    },
    {
      id: 44,
      title: 'Promise Kept General',
      dueDate: dayjs().add(37, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(42, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(38, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare a detailed report on the effectiveness of our recent marketing campaigns.',
      assignee: 'Jamie Smith',
    },
    {
      id: 45,
      title: 'Attendance',
      dueDate: dayjs().add(38, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(39, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Attend all scheduled client presentations and contribute to discussions.',
      assignee: 'Alex Johnson',
    },
    {
      id: 46,
      title: 'Promise Kept General',
      dueDate: dayjs().add(39, 'day').hour(16).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(44, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(40, 'day').hour(17).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Develop and deploy a new microservice to enhance system scalability.',
      assignee: 'Sarah Connor',
    },
    {
      id: 47,
      title: 'Teamwork',
      dueDate: dayjs().add(40, 'day').hour(12).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(45, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(41, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Actively participate in team discussions and contribute innovative ideas.',
      assignee: 'Mike Miller',
    },
    {
      id: 48,
      title: 'Promise Kept General',
      dueDate: dayjs().add(41, 'day').hour(14).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(46, 'day').hour(13).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(42, 'day').hour(15).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Conduct a thorough review of all legal documents related to new partnerships.',
      assignee: 'Chris Parker',
    },
    {
      id: 49,
      title: 'Attendance',
      dueDate: dayjs().add(42, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(47, 'day').hour(8).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Ensure my presence at all critical project review meetings.',
      assignee: 'Riley Chen',
    },
    {
      id: 50,
      title: 'Promise Kept General',
      dueDate: dayjs().add(43, 'day').hour(10).minute(0).format('MMM D, YYYY, hh:mm A'),
      committedDate: dayjs().subtract(48, 'day').hour(9).minute(0).format('MMM D, YYYY, hh:mm A'),
      approvedDate: dayjs().add(44, 'day').hour(11).minute(0).format('MMM D, YYYY, hh:mm A'),
      description: 'Prepare a comprehensive report on our competitive landscape.',
      assignee: 'Jamie Smith',
    },
  ];

  const myCommitmentsTabs = [
    {
      label: 'My Promises',
      count: myPromisesItems.length,
      items: myPromisesItems,
    },
    {
      label: 'My Badges',
      count: 65,
      items: [
        { id: 101, title: 'Teamwork', dueDate: 'May 28, 12:00 AM', committedDate: 'May 27, 9:15 PM', description: 'I promise to attend the intern meeting and provide valuable feedback.', assignee: 'Riley Chen' },
        { id: 102, title: 'Promise Kept General', dueDate: 'May 27, 09:15 PM', committedDate: 'May 27, 9:15 PM', description: 'I will join the project kickoff meeting to discuss the upcoming launch.', assignee: 'Chris Parker' },
        { id: 103, title: 'Attendance', dueDate: 'May 26, 10:00 AM', committedDate: 'May 25, 9:15 PM', description: 'I commit to be on time for all the daily stand-ups this week.', assignee: 'Alex Johnson' },
        { id: 104, title: 'Promise Kept General', dueDate: 'May 25, 05:00 PM', committedDate: 'May 24, 9:15 PM', description: 'I will complete the code review for the new feature branch.', assignee: 'Alex Johnson' },
        { id: 105, title: 'Teamwork', dueDate: 'May 24, 10:00 AM', committedDate: 'May 23, 9:15 PM', description: 'I am going to prepare and share the agenda for the upcoming sprint planning meeting.', assignee: 'Sarah Connor' },
        { id: 106, title: 'Attendance', dueDate: 'May 23, 09:00 AM', committedDate: 'May 22, 9:15 PM', description: 'I plan to join the all-hands meeting on time and prepared to discuss Q2 goals.', assignee: 'Mike Miller' },
        { id: 107, title: 'Leadership', dueDate: 'May 22, 03:00 PM', committedDate: 'May 21, 9:15 PM', description: 'I promise to lead the brainstorming session for the new marketing campaign.', assignee: 'Jamie Smith' },
        { id: 108, title: 'Promise Kept General', dueDate: 'May 21, 11:00 AM', committedDate: 'May 20, 9:15 PM', description: 'I will deliver the final report on the agreed-upon deadline.', assignee: 'John Doe' },
        { id: 109, title: 'Attendance', dueDate: 'May 20, 02:00 PM', committedDate: 'May 19, 9:15 PM', description: 'I commit to attending the critical client call and contributing positively.', assignee: 'Jane Smith' },
        { id: 110, title: 'Teamwork', dueDate: 'May 19, 06:00 PM', committedDate: 'May 18, 9:15 PM', description: 'I am going to provide the necessary assets for the marketing campaign on time.', assignee: 'Peter Jones' },
        { id: 111, title: 'Promise Kept General', dueDate: 'May 18, 04:00 PM', committedDate: 'May 17, 9:15 PM', description: 'I will submit the expense report before the deadline.', assignee: 'Riley Chen' },
        { id: 112, title: 'Attendance', dueDate: 'May 17, 10:00 AM', committedDate: 'May 16, 9:15 PM', description: 'I plan to be present and engaged in the weekly sync meeting.', assignee: 'Chris Parker' },
        { id: 113, title: 'Teamwork', dueDate: 'May 16, 01:00 PM', committedDate: 'May 15, 9:15 PM', description: 'I will help a new team member get up to speed on the project.', assignee: 'Alex Johnson' },
        { id: 114, title: 'Leadership', dueDate: 'May 15, 09:00 AM', committedDate: 'May 14, 9:15 PM', description: 'I promise to mentor a junior developer and help them solve a complex bug.', assignee: 'Sarah Connor' },
        { id: 115, title: 'Promise Kept General', dueDate: 'May 14, 02:00 PM', committedDate: 'May 13, 9:15 PM', description: 'I will update the project documentation with the latest changes.', assignee: 'Mike Miller' },
        { id: 116, title: 'Teamwork', dueDate: 'May 13, 12:00 PM', committedDate: 'May 12, 9:15 PM', description: 'I commit to collaborating effectively with the design team on the new UI.', assignee: 'Jamie Smith' },
        { id: 117, title: 'Attendance', dueDate: 'May 12, 11:00 AM', committedDate: 'May 11, 9:15 PM', description: 'I am going to attend the optional training session to improve skills.', assignee: 'John Doe' },
        { id: 118, title: 'Promise Kept General', dueDate: 'May 11, 03:00 PM', committedDate: 'May 10, 9:15 PM', description: 'I will provide feedback on the new product design mockups.', assignee: 'Jane Smith' },
        { id: 119, title: 'Teamwork', dueDate: 'May 10, 05:00 PM', committedDate: 'May 9, 9:15 PM', description: 'I plan to share knowledge with the team during a brown bag session.', assignee: 'Peter Jones' },
        { id: 120, title: 'Attendance', dueDate: 'May 9, 09:30 AM', committedDate: 'May 8, 9:15 PM', description: 'I promise to be punctual for the sprint retrospective meeting.', assignee: 'Riley Chen' },
        { id: 121, title: 'Promise Kept General', dueDate: 'May 8, 01:00 PM', committedDate: 'May 7, 9:15 PM', description: 'I will respond to all high-priority emails within 24 hours.', assignee: 'Chris Parker' },
        { id: 122, title: 'Leadership', dueDate: 'May 7, 04:00 PM', committedDate: 'May 6, 9:15 PM', description: 'I commit to taking initiative to resolve a blocker for the team.', assignee: 'Alex Johnson' },
        { id: 123, title: 'Teamwork', dueDate: 'May 6, 10:00 AM', committedDate: 'May 5, 9:15 PM', description: 'I am going to pair program with a colleague to solve a difficult issue.', assignee: 'Sarah Connor' },
        { id: 124, title: 'Attendance', dueDate: 'May 5, 11:00 AM', committedDate: 'May 4, 9:15 PM', description: 'I will attend the company town hall meeting.', assignee: 'Mike Miller' },
        { id: 125, title: 'Promise Kept General', dueDate: 'May 4, 03:00 PM', committedDate: 'May 3, 9:15 PM', description: 'I plan to organize the team-building activity.', assignee: 'Jamie Smith' },
        { id: 126, title: 'Teamwork', dueDate: 'May 3, 02:00 PM', committedDate: 'May 2, 9:15 PM', description: 'I promise to contribute to the team\'s shared codebase.', assignee: 'John Doe' },
        { id: 127, title: 'Attendance', dueDate: 'May 2, 09:00 AM', committedDate: 'May 1, 9:15 PM', description: 'I will be present for the entire duration of the workshop.', assignee: 'Jane Smith' },
        { id: 128, title: 'Promise Kept General', dueDate: 'May 1, 05:00 PM', committedDate: 'Apr 30, 9:15 PM', description: 'I commit to cleaning up the project board and archiving old tasks.', assignee: 'Peter Jones' },
        { id: 129, title: 'Leadership', dueDate: 'Apr 30, 10:00 AM', committedDate: 'Apr 29, 9:15 PM', description: 'I am going to volunteer to lead the next project epic.', assignee: 'Riley Chen' },
        { id: 130, title: 'Teamwork', dueDate: 'Apr 29, 01:00 PM', committedDate: 'Apr 28, 9:15 PM', description: 'I will offer constructive feedback during a peer review.', assignee: 'Chris Parker' },
        { id: 131, title: 'Attendance', dueDate: 'Apr 28, 09:00 AM', committedDate: 'Apr 27, 9:15 PM', description: 'I plan to attend all scheduled meetings for the week.', assignee: 'Alex Johnson' },
        { id: 132, title: 'Promise Kept General', dueDate: 'Apr 27, 04:00 PM', committedDate: 'Apr 26, 9:15 PM', description: 'I promise to follow up on all action items from the previous meeting.', assignee: 'Sarah Connor' },
        { id: 133, title: 'Teamwork', dueDate: 'Apr 26, 11:00 AM', committedDate: 'Apr 25, 9:15 PM', description: 'I will help document a new process for the team.', assignee: 'Mike Miller' },
        { id: 134, title: 'Leadership', dueDate: 'Apr 25, 02:00 PM', committedDate: 'Apr 24, 9:15 PM', description: 'I commit to presenting the team\'s achievements to senior management.', assignee: 'Jamie Smith' },
        { id: 135, title: 'Attendance', dueDate: 'Apr 24, 10:00 AM', committedDate: 'Apr 23, 9:15 PM', description: 'I am going to be on time for the client demo.', assignee: 'John Doe' },
        { id: 136, title: 'Promise Kept General', dueDate: 'Apr 23, 03:00 PM', committedDate: 'Apr 22, 9:15 PM', description: 'I will complete the mandatory security training.', assignee: 'Jane Smith' },
        { id: 137, title: 'Teamwork', dueDate: 'Apr 22, 01:00 PM', committedDate: 'Apr 21, 9:15 PM', description: 'I plan to welcome a new hire and help them feel comfortable.', assignee: 'Peter Jones' },
        { id: 138, title: 'Attendance', dueDate: 'Apr 21, 09:30 AM', committedDate: 'Apr 20, 9:15 PM', description: 'I promise to be punctual for the sprint retrospective meeting.', assignee: 'Riley Chen' },
        { id: 139, title: 'Promise Kept General', dueDate: 'Apr 20, 05:00 PM', committedDate: 'Apr 19, 9:15 PM', description: 'I will review and approve the pull request in a timely manner.', assignee: 'Chris Parker' },
        { id: 140, title: 'Leadership', dueDate: 'Apr 19, 02:00 PM', committedDate: 'Apr 18, 9:15 PM', description: 'I commit to identifying a potential risk and proposing a mitigation plan.', assignee: 'Alex Johnson' },
        { id: 141, title: 'Teamwork', dueDate: 'Apr 18, 11:00 AM', committedDate: 'Apr 17, 9:15 PM', description: 'I am going to participate actively in the retrospective.', assignee: 'Sarah Connor' },
        { id: 142, title: 'Attendance', dueDate: 'Apr 17, 10:00 AM', committedDate: 'Apr 16, 9:15 PM', description: 'I will attend the product roadmap presentation.', assignee: 'Mike Miller' },
        { id: 143, title: 'Promise Kept General', dueDate: 'Apr 16, 04:00 PM', committedDate: 'Apr 15, 9:15 PM', description: 'I plan to provide a detailed status update in the project channel.', assignee: 'Jamie Smith' },
        { id: 144, title: 'Teamwork', dueDate: 'Apr 15, 01:00 PM', committedDate: 'Apr 14, 9:15 PM', description: 'I promise to help a colleague with their task when they were stuck.', assignee: 'John Doe' },
        { id: 145, title: 'Attendance', dueDate: 'Apr 14, 09:00 AM', committedDate: 'Apr 13, 9:15 PM', description: 'I will be present for the team lunch.', assignee: 'Jane Smith' },
        { id: 146, title: 'Promise Kept General', dueDate: 'Apr 13, 03:00 PM', committedDate: 'Apr 12, 9:15 PM', description: 'I commit to testing the new feature on a staging environment.', assignee: 'Peter Jones' },
        { id: 147, title: 'Leadership', dueDate: 'Apr 12, 11:00 AM', committedDate: 'Apr 11, 9:15 PM', description: 'I am going to facilitate a productive discussion during a meeting.', assignee: 'Riley Chen' },
        { id: 148, title: 'Teamwork', dueDate: 'Apr 11, 02:00 PM', committedDate: 'Apr 10, 9:15 PM', description: 'I will acknowledge the contributions of other team members.', assignee: 'Chris Parker' },
        { id: 149, title: 'Attendance', dueDate: 'Apr 10, 10:00 AM', committedDate: 'Apr 9, 9:15 PM', description: 'I plan to attend the weekly project review.', assignee: 'Alex Johnson' },
        { id: 150, title: 'Promise Kept General', dueDate: 'Apr 9, 05:00 PM', committedDate: 'Apr 8, 9:15 PM', description: 'I promise to write unit tests for the new code.', assignee: 'Sarah Connor' },
        { id: 151, title: 'Teamwork', dueDate: 'Apr 8, 01:00 PM', committedDate: 'Apr 7, 9:15 PM', description: 'I will share a useful article with the team.', assignee: 'Mike Miller' },
        { id: 152, title: 'Attendance', dueDate: 'Apr 6, 09:30 AM', committedDate: 'Apr 5, 9:15 PM', description: 'I commit to being on time for the one-on-one meeting.', assignee: 'Jamie Smith' },
        { id: 153, title: 'Promise Kept General', dueDate: 'Apr 6, 04:00 PM', committedDate: 'Apr 5, 9:15 PM', description: 'I am going to create a ticket for a bug I found.', assignee: 'John Doe' },
        { id: 154, title: 'Leadership', dueDate: 'Apr 5, 02:00 PM', committedDate: 'Apr 4, 9:15 PM', description: 'I will provide clear direction to the team on a new task.', assignee: 'Jane Smith' },
        { id: 155, title: 'Teamwork', dueDate: 'Apr 4, 11:00 AM', committedDate: 'Apr 3, 9:15 PM', description: 'I plan to celebrate a team success.', assignee: 'Peter Jones' },
        { id: 156, title: 'Attendance', dueDate: 'Apr 3, 10:00 AM', committedDate: 'Apr 2, 9:15 PM', description: 'I promise to attend the sprint planning session.', assignee: 'Riley Chen' },
        { id: 157, title: 'Promise Kept General', dueDate: 'Apr 2, 03:00 PM', committedDate: 'Apr 1, 9:15 PM', description: 'I will give a presentation on a new technology.', assignee: 'Chris Parker' },
        { id: 158, title: 'Teamwork', dueDate: 'Apr 1, 01:00 PM', committedDate: 'Mar 31, 9:15 PM', description: 'I commit to brainstorming ideas for the next hackathon.', assignee: 'Alex Johnson' },
        { id: 159, title: 'Attendance', dueDate: 'Mar 31, 09:00 AM', committedDate: 'Mar 30, 9:15 PM', description: 'I am going to be present for the daily stand-up.', assignee: 'Sarah Connor' },
        { id: 160, title: 'Promise Kept General', dueDate: 'Mar 30, 05:00 PM', committedDate: 'Mar 29, 9:15 PM', description: 'I will resolve a merge conflict.', assignee: 'Mike Miller' },
        { id: 161, title: 'Leadership', dueDate: 'Mar 29, 02:00 PM', committedDate: 'Mar 28, 9:15 PM', description: 'I plan to delegate tasks effectively to team members.', assignee: 'Jamie Smith' },
        { id: 162, title: 'Teamwork', dueDate: 'Mar 28, 11:00 AM', committedDate: 'Mar 27, 9:15 PM', description: 'I promise to provide support to a team member who was struggling.', assignee: 'John Doe' },
        { id: 163, title: 'Attendance', dueDate: 'Mar 27, 10:00 AM', committedDate: 'Mar 26, 9:15 PM', description: 'I will attend the design review meeting.', assignee: 'Jane Smith' },
        { id: 164, title: 'Promise Kept General', dueDate: 'Mar 26, 04:00 PM', committedDate: 'Mar 25, 9:15 PM', description: 'I commit to refactoring a complex piece of code.', assignee: 'Peter Jones' },
        { id: 165, title: 'Teamwork', dueDate: 'Mar 25, 01:00 PM', committedDate: 'Mar 24, 9:15 PM', description: 'I am going to help onboard a new team member.', assignee: 'Riley Chen' },
      ],
    },
    {
      label: 'My Unkept Promises',
      count: 3,
      items: [
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
      ],
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
    const myPromisesTab = myCommitmentsTabs.find(tab => tab.label === 'My Promises');
    return myPromisesTab ? myPromisesTab.items : [];
  };

  const handleExportCsv = () => {
    const dataToExport = getMyPromisesDataForExport();
    exportToCsv(dataToExport, 'My_Promises');
  };

  const handleExportXlsx = () => {
    const dataToExport = getMyPromisesDataForExport();
    exportToXlsx(dataToExport, 'My_Promises');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <NavigationTabs />

      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <UserProfileSection
          name="Alex Johnson"
          phone="+1 (555) 123-4567"
          // displayMode and onToggleDisplayMode are now handled by CommitmentsSection for My Commitments
          onExportCsv={handleExportCsv}
          onExportXlsx={handleExportXlsx}
          showExportOptions={true} // Always show export options for this section
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
              displayMode={displayMode} // Pass displayMode to CommitmentsSection
              onToggleDisplayMode={setDisplayMode} // Pass toggle handler to CommitmentsSection
              showClearAllFilters={true}
              isActionsPage={false}
              isCommitmentPortfolioPage={true} // New prop
            />
          </Grid>

          {/* Commitments to Others */}
          <Grid item xs={12}>
            <CommitmentsSection
              title="Others' Commitments"
              tabs={commitmentsReceivedTabs}
              displayMode="regular" // Others' commitments always in regular mode
              showClearAllFilters={true}
              isActionsPage={false}
              isCommitmentPortfolioPage={true} // New prop
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CommitmentPortfolio;