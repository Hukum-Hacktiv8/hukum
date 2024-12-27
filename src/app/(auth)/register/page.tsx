import AuthForm from "@/components/auth/form"
import Footer from "@/components/Footer"
import WaveDivider from "@/components/wave-divider"

export default function Register() {
    return (
        <div>
            <AuthForm type="register" />
            <WaveDivider />
            <Footer />
        </div>
    )
}