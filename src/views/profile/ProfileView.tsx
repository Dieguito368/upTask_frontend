import { useAuth } from "@/hooks/useAuth";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfileView = () => {
    const { user } = useAuth();

    if(user) return <ProfileForm data={ user } />
}

export default ProfileView;