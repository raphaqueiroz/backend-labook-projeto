"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikeDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class LikeDislikeDatabase extends BaseDatabase_1.BaseDatabase {
    LikeUserPostId(user_id, post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
                .where({ user_id, post_id });
            return result;
        });
    }
    findLikesByPostId(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
                .where({ post_id });
            return result;
        });
    }
    createLike(newLikeDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
                .insert(newLikeDB);
        });
    }
    updateLikeByUserAndPostId(updatedLikeDB, user_id, post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
                .update(updatedLikeDB)
                .where({ user_id, post_id });
        });
    }
    deleteLikeByUserAndPostId(user_id, post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
                .del()
                .where({ user_id, post_id });
        });
    }
    deleteLikesByPostId(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
                .del()
                .where({ post_id });
        });
    }
}
exports.LikeDislikeDatabase = LikeDislikeDatabase;
LikeDislikeDatabase.TABLE_LIKES_DISLIKES = "likes_dislikes";
//# sourceMappingURL=LikeDislikesDatabase.js.map