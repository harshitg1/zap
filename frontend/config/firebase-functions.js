import { onSnapshot, query, addDoc } from "firebase/firestore";

const fetchDocs = (colRef, setState) => {
    return onSnapshot(query(colRef), (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setState(newData);
    });
}

const putDoc = async (colRef, data, setState, initialFormData) => {
    try {
        const docRef = await addDoc(colRef, data);
        setState(initialFormData);
      } catch (error) {
        console.error("Error adding document to Firebase:", error);
      }
}

export { fetchDocs, putDoc };