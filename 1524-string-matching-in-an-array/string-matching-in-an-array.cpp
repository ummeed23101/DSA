class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        set<string> mp;

    
        for(int i =0; i<words.size(); i++){
            for(int j=0; j<words.size(); j++){
                if(i!=j && words[j].find(words[i])!=string::npos){
                    mp.insert(words[i]);
                }
            }
        }

       
    vector<string> res(mp.begin(),mp.end());
    return res;

    }
};