// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useMemo, ReactElement } from "react";
// import { Rocket, Wrench, Building2 } from "lucide-react";

// const rolePrompts: Record<
//   string,
//   { title: string; desc: string; icon: ReactElement; action: string; link: string }
// > = {
//   "start-business": {
//     title: "Create your first Business Post?",
//     desc: "Kickstart your entrepreneurial journey by sharing your business idea with the community.",
//     icon: <Rocket className="w-8 h-8 text-purple-400" />,
//     action: "Create Now",
//     link: "/createpost/business/step1",
//   },
//   "share-profession": {
//     title: "Add your first Service?",
//     desc: "Showcase your skills and connect with those who need your expertise.",
//     icon: <Wrench className="w-8 h-8 text-green-400" />,
//     action: "Add Service",
//     link: "/createpost/professional/step1",
//   },
//   "share-physical": {
//     title: "List your first Asset?",
//     desc: "Provide access to your resources and collaborate with upcoming businesses.",
//     icon: <Building2 className="w-8 h-8 text-blue-400" />,
//     action: "List Asset",
//     link: "/createpost/asset/step1",
//   },
// };

// export default function CompleteRegistrationPage() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const googleId = params.get("googleId");
//   const accountTypes = params.get("accountTypes")?.split(",") || [];

//   const prompts = useMemo(() => accountTypes.map((role) => rolePrompts[role]), [accountTypes]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col items-center justify-center px-6 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="w-full max-w-3xl space-y-8"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//           Complete Your Setup ✨
//         </h1>
//         <p className="text-center text-gray-400">Based on your chosen roles, let’s get started.</p>

//         <div className="space-y-6">
//           {prompts.map((prompt, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2, duration: 0.6 }}
//             >
//               <Card className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all">
//                 <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                   <div className="flex items-start gap-4">
//                     <div className="p-3 bg-gray-800 rounded-xl">{prompt.icon}</div>
//                     <div>
//                       <h2 className="text-xl font-semibold">{prompt.title}</h2>
//                       <p className="text-gray-400 text-sm mt-1">{prompt.desc}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <Button
//                       onClick={() => router.push(prompt.link + `?googleId=${googleId}`)}
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl px-5 py-2 text-sm font-medium"
//                     >
//                       {prompt.action}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="border-gray-700 text-gray-400 hover:bg-gray-800 rounded-xl px-5 py-2 text-sm font-medium"
//                       onClick={() => router.push("/dashboard")}
//                     >
//                       Skip for later
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }
