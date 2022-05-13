from django.shortcuts import render
from rest_framework import generics, status
from .serializers import CandidateSerializer, CreateCandidateSerializer
from .models import Candidate
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse



# Create your views here.
class IndexView(generics.ListAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

class GetCandidates(APIView):
    def get(self, request):
        candidates = Candidate.objects.all()
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CreateCandidate(APIView):
    serializer_class = CreateCandidateSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ViewCandidate(APIView):

    def get(self, request, app_code):
        candidate = Candidate.objects.get(app_code=app_code)
        if candidate:
            serializer = CandidateSerializer(candidate)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

class UpdateStatus(APIView):
        def put(self, request, app_code):
            candidate = Candidate.objects.get(app_code=app_code)
            if candidate:
                print(request.data)
                candidate.status = request.data
                candidate.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
