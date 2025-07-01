import LoadingOnButton from "../LoadingOnButton";

const PrimaryButton = ({ onClick, label = "Label", loading = false, disabled=false }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      onClick={(e) => onClick(e)}
      className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex justify-center relative cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-3 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:transform-none"
    >
      {loading ? <LoadingOnButton /> : label}
    </button>
  );
};

export default PrimaryButton;
