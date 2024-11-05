import { FaCalendarAlt, FaUser } from "react-icons/fa";
import Videos from "../../pages/oneCourseVideos";
import Login from "../../pages/login";
import Packages from "../../pages/packeges";
import Years from "../../pages/courses";
import GroupsQuizzes from "../../pages/courses/YearGroups/exams";
import ExamGroupsScores from "../../pages/courses/YearGroups/examScores";
import YearGroups from "../../pages/courses/YearGroups/index";
import Deplouma from "../../pages/deplouma";
import CategoryVideos from "../../pages/courses/videos";
import Lectures from "../../pages/courses/videos/lectures";
import PdfWithType from "../../components/days/videos/pdf/addPdfWithType";
import CreateCards from "../../components/days/videos/pdf/createCards";
import Students from "../../pages/students";
import Subscription from "../../pages/students/subscription";
import UniPage from "../../pages/UniPage/UniPage";
import UniLectures from '../../pages/UniPage/Lectures/Lectures';
import UniSubjects from "../../pages/UniPage/UniSubjects/UniSubjects";
import UniVideos from "../../pages/UniPage/UniVideos/UniVideos";
import VideoQuestions from "../../pages/UniPage/Lectures/VideoQuestions/VideoQuestions";
import LectureQuestions from "../../pages/UniPage/Lectures/LecturesQuestions/LecturesQuestions";

export const links = 
// localStorage.getItem("moreenglishlogin")
//   ? 
  [
      {
        id: 1,
        label: "الفرق",
        component:UniPage,
        route:"",
        icon: <FaCalendarAlt />,
        subRoutes: [
          {
            route: "",
            component: UniPage,
          },
          {
            route:"/:sub_id/subjects/",
            component:  UniSubjects,
          },
          {
            route:"/:generation_id/:lec_id/:videos_id/videos/",
            component:  UniVideos,
          },
          {
            route:"/:generation_id/:lect_id/subjects/lectures/",
            component:  UniLectures
          },
          {
            route:"/:video_question/videos/questions/",
            component:  VideoQuestions
          },
          {
            route:"/:lect_questions/lectures/questions/",
            component:  LectureQuestions
          },
        ],
      }, 

      // {
      //   id: 1,
      //   label: "عمل كروت الاشتراكات",
      //   route: "/CreateCards",
      //   icon: <FaCalendarAlt />,
      //   // hidden:true,
      //   subRoutes: [
      //     // {
      //     //   route: "",
      //     //   component: Years,
      //     // },
      //     {
      //       route: "/CreateCards",
      //       component: CreateCards,
      //     },
      //   ],
      // },
      // {
      //   id: 1,
      //   label: "كورس التأسيس",
      //   route: "",
      //   icon: <FaCalendarAlt />,
      //   hidden:true,
      //   subRoutes: [
      //     // {
      //     //   route: "",
      //     //   component: Years,
      //     // },
      //     {
      //       route: "years/:subject/groups/:type",
      //       component: PdfWithType,
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   label: "الدراسة الأكاديمية",
      //   route: "/years",
      //   icon: <FaCalendarAlt />,
      //   component: Years,
      //   subRoutes: [
      //     {
      //       route: "",
      //       component: YearGroups,
      //     },
      //     {
      //       route: ":subject/groups",
      //       component: Years,
      //     },
      //     {
      //       route: ":subject/groups/Lectures/:lecture/videos",
      //       component: CategoryVideos,
      //     },
      //     {
      //       route: ":subject/groups/Lectures",
      //       component: Lectures,
      //     },
      //     {
      //       route: ":yearId/groups/:groupID/exams/:quiz_id/score",
      //       component: ExamGroupsScores,
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   label: "دبلومات ودورات",
      //   route: "/Deplouma",
      //   icon: <FaCalendarAlt />,
      //   component: Deplouma,
      //   subRoutes: [
      //     {
      //       route: "",
      //       component: Deplouma,
      //     },
      //     {
      //       route: ":subject/groups/Lectures",
      //       component: Lectures,
      //     },
      //     {
      //       route: ":subject/groups/Lectures/:lecture/videos",
      //       component: CategoryVideos,
      //     },
      //   ],
      // },
      // {
      //   id: 1,
      //   label: "الطلاب",
      //   route: "/Students",
      //   icon: <FaCalendarAlt />,
      //   component: Students,

      // },
      // {
      //   id: 1,
      //   label: "الاشتراكات",
      //   route: "/Subscription",
      //   icon: <FaCalendarAlt />,
      //   component: Subscription,

      // },

      
      // {
      //   id: 3,
      //   label: "Students",
      //   route: "/students",
      //   icon: <FaUserGraduate />,
      //   component: Students,
      // },
      // {
      //   id: 4,
      //   label: "Subscription Cards",
      //   route: "/SubscriptionCards",
      //   icon: <FaCreditCard />,
      //   component: SubscriptionCards,
      // },

      // {
      //   id: 6,
      //   label: "Not Assigned Groups",
      //   route: "/notAssignedThird",
      //   icon: <FaUsersSlash />,
      //   component: NotAssignedThirdGroup,
      //   subRoutes: [
      //     {
      //       route: "",
      //       component: NotAssignedThirdGroup,
      //     },
      //     {
      //       route: ":id/groupStudents",
      //       component: GroupStudents,
      //     },
      //   ],
      // },

      // {
      //   id: 5,
      //   label: "Subscriptions",
      //   route: ":id/Subscriptions/:type",
      //   icon: <FaDollarSign />,
      //   component: Subscriptions,
      //   hidden: true,
      // },
      // {
      //   id: 8,
      //   label: "Paused Students",
      //   route: "/Paused",
      //   icon: <FaUserAltSlash />,
      //   component: PausedStudents,
      // },
      // {
      //   id: 7,
      //   label: "Absent Students",
      //   route: "/Absence",
      //   icon: <FaUserClock />,
      //   component: AbsentStudents,
      // },
      // {
      //   id: 9,
      //   label: "Check Transfer",
      //   route: "/CheckTransferMoney",
      //   icon: <FaMoneyCheckAlt />,
      //   component: CheckTransferMoney,
      // },
      // {
      //   id: 10,
      //   label: "Transfer Money",
      //   route: "/TransferMoney",
      //   icon: <FaMoneyBillWave />,
      //   component: TransferMoney,
      // },
      // {
      //   id: 11,
      //   label: "Subscription Counts",
      //   route: "/SubscriptionCounts",
      //   icon: <FaBoxOpen />,
      //   component: SubscriptionCounts,
      //   subRoutes: [
      //     {
      //       route: "",
      //       component: SubscriptionCounts,
      //     },
      //     {
      //       route: ":pack_id/students",
      //       component: PackSubscriptions,
      //     },
      //   ],
      // },
      // {
      //   id: 12,
      //   label: "Check Card",
      //   route: "/checkCard",
      //   icon: <FaRegCreditCard />,
      //   component: CheckCard,
      // },
    ]
  // : [
  //     {
  //       id: 4,
  //       label: "Login",
  //       route: "*",
  //       icon: <FaUser />,
  //       component: Login,
  //       hidden: true,
  //     },
  //   ];
