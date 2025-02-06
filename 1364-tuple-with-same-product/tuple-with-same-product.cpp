class Solution {
public:
    int tupleSameProduct(vector<int>& nums) {
        map<int, int> mp;

        for(int i =0; i<nums.size(); i++){
            for(int j=i+1; j<nums.size(); j++){
                mp[nums[i]*nums[j]]++;
            }
        }

        int count = 0;

        for(auto it: mp){
            if(it.second>=2){
                count+=(it.second * (it.second -1))*4;
            }
        }

        return count;
    }
};