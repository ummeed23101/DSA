class Solution {
public:

int countSlices(vector<int> &nums, int maxSum) {
        int n = nums.size();
        int partitions = 1;
        long long subarraySum = 0;

        for (int i = 0; i < n; i++) {
            if (subarraySum + nums[i] <= maxSum) {
                
                subarraySum += nums[i];
            } else {
                
                partitions++;
                subarraySum = nums[i];
            }
        }

        return partitions;}
    int splitArray(vector<int>& nums, int k) {
        
         int low = *max_element(nums.begin(), nums.end()); 
        int high = accumulate(nums.begin(), nums.end(), 0);
        
        while (low <= high) {
            int mid = (low + high) / 2;
            int partitions = countSlices(nums, mid);

            if (partitions > k) {
                
                low = mid + 1;
            } 
            else {
                
                high = mid - 1;
            }
        }
        return low;
    }
};