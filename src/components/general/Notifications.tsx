import { toast, ToastOptions } from 'react-toastify';

const successIcon = '/icons/success-rounded.svg';
const errorIcon = '/icons/error-triangle.svg';

const toastIcon = ({ type }: { type: string }) => <img src={type === 'error' ? errorIcon : successIcon} />;

const successStyle = {
	backgroundColor: '#A7F3D0',
	borderRadius: '10px',
	fontWeight: 600,
	fontSize: '12px',
	color: '#0F172A',
	border: '1px solid #34D399',
};

const errorStyle = {
	backgroundColor: '#FECACA',
	borderRadius: '10px',
	fontWeight: 600,
	fontSize: '14px',
	color: '#0F172A',
	border: '1px solid #F87171',
};

type CustomToast = Partial<ToastOptions>;

export const subtleToast: CustomToast = {
	pauseOnFocusLoss: false,
	pauseOnHover: false,
	hideProgressBar: true,
};

export const error = (message: string, options?: ToastOptions) =>
	toast.error(message, { autoClose: 2000, icon: toastIcon, hideProgressBar: true, style: errorStyle, ...options });

export const success = (message: string, options?: ToastOptions) =>
	toast.success(message, { autoClose: 2000, icon: toastIcon, hideProgressBar: true, style: successStyle, ...options });

export const notify = { error, success };
