import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();
  console.log("token", token);

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "We need camera roll permissions to upload an image"
          );
          return;
        }
      }
      //launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, //lower quality for smaller base64
        base64: true, //get base64 string
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);

        //if base64 is provided, use it
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        }
      }
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    try {
      setLoading(true);

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // make sure this exact header is sent
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      });

      // Check response status BEFORE parsing
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Non-JSON error response:", errorText);
        throw new Error(
          `Failed to post: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      Alert.alert("Success", "Your book recommendation has been posted!");
      setTitle("");
      setCaption("");
      setRating(3); // reset to default rating
      setImage(null);
      setImageBase64(null);
      router.push("/");
    } catch (error) {
      console.error("Error creating Post:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyles={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}> Add Book Recommendation </Text>
            <Text style={styles.subtitle}>
              {" "}
              share your favorite reads with others{" "}
            </Text>
          </View>
          {/* BOOK TITLE */}
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> Book Title </Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
            {/* RATING */}
            <View style={styles.formGroup}>
              <Text style={styles.label}> Your Rating </Text>
              {renderRatingPicker(rating, setRating)}
            </View>
          </View>
          {/* IMAGE */}
          <View style={styles.formGroup}>
            <Text style={styles.label}> Book Image </Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Ionicons
                    name="image-outline"
                    size={40}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.placeholderText}>
                    Tap to select image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* CAPTION */}
          <View style={styles.formGroup}>
            <Text style={styles.label}> Caption </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Write your review or thoughts about this book..."
              placeholderTextColor={COLORS.placeholderText}
              value={caption}
              onChangeText={setCaption}
              multiline
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}> Share </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
