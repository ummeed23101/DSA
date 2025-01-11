class Solution {
public:
    bool canConstruct(string s, int k) {
        int numberOfCharsWithOddCount = 0;
        if(s.size()<k) return false;
        if(s.size()==k) return true;
        vector<int> freq(26);

        for(char it: s){
            freq[it-'a']++;
        }

        for(auto it: freq){
            if(it%2==1){
                numberOfCharsWithOddCount++;
            }
        }

        if(numberOfCharsWithOddCount>k) return false;

        return true;
    }
};