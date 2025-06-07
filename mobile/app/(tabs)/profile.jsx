import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/authStore";

export default function profile() {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress={logout}>
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
