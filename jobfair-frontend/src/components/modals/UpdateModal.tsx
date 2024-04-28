// 'use client'

// import { SafeInterview, SafeUser } from "@/types";
// import Modal from "./Modal";
// import { useCallback, useState } from "react";
// import useUpdateModal from "@/hooks/useUpdateModal";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Calendar  from "@/components/inputs/Calendar";
// import { user } from "../../../interface";

// interface UpdateModalProps {
//     currentUser: SafeUser | null;
//     interviewData: SafeInterview | null;
//     onAction?: () => void;
// }

// const UpdateModal: React.FC<UpdateModalProps> = ({
//     onAction,
//     interviewData,
//     currentUser,
// }) => {
//     const UpdateModal = useUpdateModal();
//     const [isLoading, setIsLoading] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: {
//             errors,
//         },
//     } = useForm<FieldValues>({
//         defaultValues: {
//             date: ''
//         },
//     });

//     const onToggle = useCallback(() => {
//         if (!UpdateModal.isOpen) {
//             UpdateModal.onOpen;
//         }
//     }, [UpdateModal])

//     const onSubmit: SubmitHandler<FieldValues> = (data) => {
//         setIsLoading(true);

//         axios.post(`/api/interviews/${interviewData.id}`, data)
//             .then(() => {
//                 toast.success('Registered!');
//                 UpdateModal.onClose();
//             })
//             .catch((error) => {
//                 toast.error(error);
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             })
//     }
    
//     const bodyContent = (
//         // <Calendar />
//       )
//     return (
//         <Modal
//             disabled={isLoading}
//             isOpen={false}
//             title="Login"
//             actionLabel="Continue"
//             onClose={UpdateModal.onClose}
//             onSubmit={handleSubmit(onSubmit)}
//             body={bodyContent}
//         />
//     );
// }

// export default UpdateModal;