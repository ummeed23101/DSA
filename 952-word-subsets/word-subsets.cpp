class Solution {
    void setMaxFreq(vector<int>& globalFreq,vector<int>& freq){
        for(int i=0;i<26;++i)
            globalFreq[i] = max(globalFreq[i],freq[i]);
    }
    bool isUniversal(vector<int>& freq,vector<int>& globalFreq){
        for(int i=0;i<26;++i){
            if(freq[i]<globalFreq[i])
                return false;
        }
        return true;
    }
public:
    vector<string> wordSubsets(vector<string>& words1, vector<string>& words2) {
      
        vector<int> globalFreq(26); //we can have atmost 26 keys so space is O(1)
        for(auto word: words2){
            vector<int> freq(26); //for each word in words 2 we take max frequency and hence reset
            for(auto c: word)
                freq[c-'a']++;
            setMaxFreq(globalFreq,freq);
        }

        vector<string> universal_words;
        for(string word: words1){
            vector<int> freq(26);
            for(char c: word)
                freq[c-'a']++;
            
            if(isUniversal(freq,globalFreq))
                universal_words.push_back(word);
        }
        return universal_words;
    }
};