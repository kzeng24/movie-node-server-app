import mongoose from "mongoose";

// Custom validator for roles
function roleValidator(value) {
    if (value.length > 2) return false; // can't have more than two roles

    // Define valid combinations
    const validCombinations = [["ADMIN", "CRITIC"], ["ADMIN", "VIEWER"]];

    // If the user only has one role, it is always valid
    if (value.length === 1) return true;

    // If user has two roles, check if the combination is valid
    const sortedRoles = [...value].sort();
    for (let combo of validCombinations) {
        if (JSON.stringify(combo.sort()) === JSON.stringify(sortedRoles)) {
            return true;
        }
    }

    // If it gets here, the combination is invalid
    return false;
}

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    followedCritics: Array,
    roles: {
        type: [String],
        enum: ["ADMIN", "CRITIC", "VIEWER"],
        validate: [roleValidator, 'Invalid role combination.'],
        default: ["VIEWER"]
    },
}, { collection: "users" });

export default usersSchema;
