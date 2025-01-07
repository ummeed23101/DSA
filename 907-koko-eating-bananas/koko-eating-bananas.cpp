class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int maxPile = 1;

        for(auto it: piles){
            maxPile = max(maxPile, it);
        }

        long long left =1;
        long long right =maxPile;
            int possibleAns =INT_MAX;

        while(left<=right){

            int mid=left+(right-left)/2;
            long long totalTime=0;

            for(auto it:piles){
                totalTime = totalTime + ((mid+it-1)/mid);
            }

            if(totalTime<=h){
                possibleAns = min(possibleAns,mid);
                right =mid-1;
            }

            else{
                left = mid+1;
            }
        }

        return possibleAns;
    }
};