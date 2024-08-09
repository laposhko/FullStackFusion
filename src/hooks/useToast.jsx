import toast from "react-hot-toast";

const useToast = () => {
  const success = (successMessage) =>
    toast.success(successMessage, {
      duration: 2000,
      position: "top-right",
    });
  const error = (errorMessage) =>
    toast.error(errorMessage, {
      duration: 2000,
      position: "top-right",
    });

  return { successToast: success, errorToast: error };
};

export default useToast;
