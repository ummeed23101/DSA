class Solution {
public:

    void helperSubset(vector<int> nums, int currentIndex, vector<int> levels, vector<vector<int>> &answer){

        
        if(currentIndex==nums.size()) {
            answer.push_back(levels);
            return;
        }

        int x = nums[currentIndex];
        helperSubset(nums, currentIndex+1, levels, answer);
        levels.push_back(x);
        helperSubset(nums, currentIndex+1, levels,answer);
        

    }
    vector<vector<int>> subsets(vector<int>& nums) {
            vector<vector<int>> answer;
            vector<int> levels;
            helperSubset(nums,0, levels, answer);

            return answer;
    }
};