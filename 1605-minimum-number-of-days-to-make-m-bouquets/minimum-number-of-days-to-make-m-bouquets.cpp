class Solution {
public:
    int minDays(vector<int>& bloomDay, int m, int k) {
        

        long long right = *max_element(bloomDay.begin(), bloomDay.end());
        long long left = 1;
        long long possibleAnswer = -1;

        while (left <= right) {
            long long mid = left + (right - left) / 2;
            int consecutiveDays = 0;
            int numberOfBouquets = 0; 

            for (auto it : bloomDay) {
                if (it <= mid) {
                    consecutiveDays += 1;
                    if (consecutiveDays == k) {
                        numberOfBouquets += 1;
                        consecutiveDays = 0; 
                    }
                } else {
                    consecutiveDays = 0; 
                }
            }

            if (numberOfBouquets >= m) {
                possibleAnswer = mid;
                right = mid - 1; 
            } else {
                left = mid + 1; 
            }
        }
        if(possibleAnswer>0) return possibleAnswer;
        
        return -1;
        
    }
};