import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-thQN6nJD64nWM6gA9IWoxShe4gNoqm4",
    authDomain: "ideaiser.firebaseapp.com",
    projectId: "ideaiser",
    storageBucket: "ideaiser.firebasestorage.app",
    messagingSenderId: "546979550512",
    appId: "1:546979550512:web:a0ec6ffe512754d5cc64f5",
    measurementId: "G-0X55T94B39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Export commonly used functions for other modules
export { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, where, updateDoc };

let currentUser = null;
const SUPER_ADMIN_EMAIL = "reyhansingh01@gmail.com";
let isPro = localStorage.getItem('ideaiser_pro') === 'true';
let analysisCount = parseInt(localStorage.getItem('ideaiser_count') || '0');
const MAX_FREE_ANALYSES = 3;

export function initAuth(uiUpdateCallback) {
    const loginBtn = document.getElementById('loginBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profile = document.getElementById('userProfile');
    const avatar = document.getElementById('userAvatar');
    const name = document.getElementById('userName');
    const adminLink = document.getElementById('adminLink');

    const authModal = document.getElementById('authModal');
    const closeAuth = document.getElementById('closeAuth');

    // UI Event Listeners
    if (loginBtn) loginBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
    if (closeAuth) closeAuth.addEventListener('click', () => authModal.classList.add('hidden'));
    if (logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth));

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            try {
                await signInWithPopup(auth, provider);
                authModal.classList.add('hidden');
            } catch (e) { alert(e.message); }
        });
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            if (loginBtn) loginBtn.classList.add('hidden');
            if (profile) profile.classList.remove('hidden');
            if (avatar) avatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=667eea&color=fff`;
            if (name) name.innerText = user.displayName || user.email.split('@')[0];

            // Sync User Data
            const userRef = doc(db, "users", user.uid);
            onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    isPro = data.isPro || (user.email === SUPER_ADMIN_EMAIL);
                    analysisCount = data.analysisCount || 0;
                    if (uiUpdateCallback) uiUpdateCallback({ isPro, analysisCount, user });

                    if (isPro || user.email === SUPER_ADMIN_EMAIL) {
                        if (adminLink) adminLink.classList.remove('hidden');
                    }
                } else {
                    setDoc(userRef, {
                        email: user.email,
                        isPro: false,
                        analysisCount: 0,
                        role: 'user',
                        createdAt: new Date().toISOString()
                    });
                }
            });

        } else {
            currentUser = null;
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (profile) profile.classList.add('hidden');
            if (adminLink) adminLink.classList.add('hidden');
            isPro = localStorage.getItem('ideaiser_pro') === 'true';
            analysisCount = parseInt(localStorage.getItem('ideaiser_count') || '0');
            if (uiUpdateCallback) uiUpdateCallback({ isPro, analysisCount, user: null });
        }
    });

    return {
        getCurrentUser: () => currentUser,
        isPro: () => isPro,
        getAnalysisCount: () => analysisCount,
        incrementAnalysis: async () => {
            analysisCount++;
            localStorage.setItem('ideaiser_count', analysisCount.toString());
            if (currentUser) {
                await updateDoc(doc(db, "users", currentUser.uid), { analysisCount });
            }
        },
        checkPlanLimit: () => {
            if (!isPro && analysisCount >= MAX_FREE_ANALYSES) {
                alert("Free limit reached! Please upgrade to Pro for unlimited analyses. 🚀");
                document.getElementById('pricingSection').scrollIntoView({ behavior: 'smooth' });
                return false;
            }
            return true;
        }
    };
}
