class Solution {
public:

    void paranthesisHelper(int n, int currentIndex, string current, int numberOfOpening, int numberOfClosing, vector<string> &answer){

        if(numberOfClosing>numberOfOpening) return;

        if(numberOfOpening>n/2) return;

        if(currentIndex==n) answer.push_back(current);

        paranthesisHelper(n, currentIndex+1, current+')', numberOfOpening, numberOfClosing+1, answer);
        paranthesisHelper(n, currentIndex+1, current+'(', numberOfOpening+1, numberOfClosing, answer);


    }
    vector<string> generateParenthesis(int n) {
        n = n + n;
        vector<string> answer;
        paranthesisHelper(n, 1, "(", 1, 0, answer);


        return answer;
    }   
};