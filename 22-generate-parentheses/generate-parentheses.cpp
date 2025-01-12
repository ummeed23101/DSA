class Solution {
public:
    int paraHelp(int index, string str, vector<string> &answer, int countOpen, int countClose, int k){
        
        if(countClose>countOpen) return 0;
        if(countOpen>k/2) return 0;

        if(index==k+1){
            answer.push_back(str);
            return 0;
        }

        paraHelp(index+1, str+'(',answer, countOpen+1, countClose, k);
        paraHelp(index+1, str+')',answer, countOpen, countClose+1, k);

        return 0;
    }

    vector<string> generateParenthesis(int n) {
        
        vector<string> answer;  
        int k = 2*n;
        string str= "(";
        int countOpen = 1;
        int countClose = 0;
        int index = 2;
        int x=paraHelp(index, str, answer, countOpen,countClose,k);

        return answer;
    }
};