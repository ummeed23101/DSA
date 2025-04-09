class Solution {
public:
    bool checkPalindrome(string s){
        int i=0;
        int j=s.length()-1;

        while(i<=j){
            if(s[i]!=s[j]){
                return false;
            }
            i++;
            j--;
        }

        return true;
    }

    void helperPartition(int index, vector<string> &list, string &s, int n, vector<vector<string>> &answer ){
        if(index==n){
            answer.push_back(list);
            return;
        }

        for(int j=index; j<n; j++){
            string temp = s.substr(index, j-index+1);
            if(checkPalindrome(temp)){
                list.push_back(temp);
                helperPartition(j+1, list, s, n, answer);
                list.pop_back();
            }
        }
    }
    vector<vector<string>> partition(string s) {
        int n = s.length();
        vector<string> list;
        vector<vector<string>> answer;
        helperPartition(0, list, s, n, answer );
        return answer;
    }
};