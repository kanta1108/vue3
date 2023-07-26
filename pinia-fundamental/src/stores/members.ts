import { defineStore } from 'pinia';
import type { Member } from '@/interfaces/interfaces';

interface State {
  memberList: Map<number, Member>;
  isLoading: boolean;
}
let _database: IDBDatabase;
const getDatabase = async (): Promise<IDBDatabase> => {
  const promise = new Promise<IDBDatabase>((resolve, reject): void => {
    if (_database != undefined) {
      resolve(_database);
    } else {
      const request = window.indexedDB.open('asyncdb', 1);
      request.onupgradeneeded = (e) => {
        const target = e.target as IDBRequest;
        const database = target.result as IDBDatabase;
        database.createObjectStore('members', { keyPath: 'id' });
      };
      request.onsuccess = (e) => {
        const target = e.target as IDBRequest;
        _database = target.result as IDBDatabase;
        resolve(_database);
      };
      request.onerror = (e) => {
        console.log('ERROR: DBをオープンできません', e);
        reject(new Error('ERROR: DBをオープンできません'));
      };
    }
  });
  return promise;
};

export const useMemberStore = defineStore({
  id: 'members',
  state: (): State => {
    return {
      memberList: new Map<number, Member>(),
      isLoading: true,
    };
  },
  getters: {
    getById: (state) => {
      return (id: number): Member => {
        const member = state.memberList.get(id) as Member;
        return member;
      };
    },
    isMemberListEmpty: (state): boolean => state.memberList.size == 0,
  },
  actions: {
    async prepareMemberList(): Promise<boolean> {
      //データベースからオブジェクトを取得する
      const database = await getDatabase();
      const promise = new Promise<boolean>((resolve, reject) => {
        //トランザクションオブジェクトを取得する
        const transaction = database.transaction('members', 'readonly');
        //memberストアオブジェクトを取得する
        const objectStore = transaction.objectStore('members');
        //空のmemberListを作成
        const memberList = new Map<number, Member>();
        //memberオブジェクトストアの全データを取得
        const request = objectStore.openCursor();
        request.onsuccess = (e) => {
          //カーソルオブジェクトを取得
          const target = e.target as IDBRequest;
          const cursor = target.result as IDBCursorWithValue;
          //カーソルが存在すれば
          if (cursor) {
            //カーソルからキーデータを取得
            const id = cursor.key as number;
            //カーソルからバリューオブジェクトを取得
            const member = cursor.value as Member;
            //memberListに格納
            memberList.set(id, member);
            //次のデータに同じ処理を登録
            cursor.continue();
          }
        };
        //トランザクションが成功したときの処理
        transaction.oncomplete = () => {
          //ステートにmemberListを格納
          this.memberList = memberList;
          //ステートのisLoadingをfalseに変更
          this.isLoading = false;
          //非同期処理の成功、promise内の戻り値をtrueに
          resolve(true);
        };
        //トランザクションが失敗した場合の処理
        transaction.onerror = (e) => {
          //非同期処理失敗、エラーメッセージを格納
          console.log('ERROR: データ取得に失敗', e);
          reject(new Error('Error: データ取得に失敗'));
        };
      });
      return promise;
    },
    async addMember(member: Member): Promise<boolean> {
      const memberAdd: Member = {
        ...member,
      };
      //データベースオブジェクトを取得する
      const database = await getDatabase();
      const promise = new Promise<boolean>((resolve, reject) => {
        //トランザクションオブジェクトを取得
        const transaction = database.transaction('members', 'readwrite');
        //membersオブジェクトを取得
        const objectStore = transaction.objectStore('members');
        //データ登録
        objectStore.put(memberAdd);
        transaction.oncomplete = () => {
          //非同期処理成功、resolve
          resolve(true);
        };
        transaction.onerror = (e) => {
          console.log('ERROR: データ登録に失敗', e);
          reject(new Error('ERROR: データ登録に失敗'));
        };
      });
      return promise;
    },
    //メンバーを削除する
    async deleteMember(id: number): Promise<boolean> {
      //データベースオブジェクトを取得する
      const database = await getDatabase();
      const promise = new Promise<boolean>((resolve, reject) => {
        //トランザクションオブジェクトを取得
        const transaction = database.transaction('members', 'readwrite');
        //membersオブジェクトを取得
        const objectStore = transaction.objectStore('members');
        //データ削除
        objectStore.delete(id);
        transaction.oncomplete = () => {
          //非同期処理成功、resolve
          resolve(true);
        };
        transaction.onerror = (e) => {
          console.log('ERROR: データ削除に失敗', e);
          reject(new Error('ERROR: データ削除に失敗'));
        };
      });
      return promise;
    },
  },
});
