class Solution {
public:

    void helperPara(int currentIndex, string currentString, int numOfOpening, int numOfClosing, int n, vector<string> &result){
        if(numOfClosing>numOfOpening) return;

        if(numOfOpening>n/2) return;

        if(currentIndex == n){
            result.push_back(currentString);
        }

        helperPara(currentIndex+1, currentString+'(', numOfOpening+1, numOfClosing, n, result);
        helperPara(currentIndex+1, currentString+')', numOfOpening, numOfClosing+1, n, result);
    }

    vector<string> generateParenthesis(int n) {
        n = n*2;
        vector<string> result;
        helperPara(1, "(", 1, 0, n, result);

        return result;
    }
};