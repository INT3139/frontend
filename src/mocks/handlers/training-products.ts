import {
  TRAINING_PRODUCT_RECORD,
  type TrainingProductRecord,
} from '@/schemas/academic-cv/training-products';
import { EDUCATION_LEVEL } from '@/schemas/education-level';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

const mockTrainingProductsRecord: TrainingProductRecord[] = [
  {
    id: 1,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Nguyễn Văn Anh',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Nghiên cứu các phương pháp bảo mật trong môi trường đám mây',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.RESEARCHER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2019',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2024',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.PENDING,
  },
  {
    id: 2,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Trần Thị Bình',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Phát triển thuật toán tối ưu hóa dữ liệu lớn cho các hệ thống tài chính',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.RESEARCHER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2019',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2024',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.PENDING,
  },
  {
    id: 3,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Lê Quang Cường',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Ứng dụng trí tuệ nhân tạo trong xử lý hình ảnh y sinh',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.RESEARCHER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2017',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2024',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 4,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Phạm Minh Đức',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Thiết kế kiến trúc vi dịch vụ cho hệ thống thương mại điện tử quy mô lớn',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2016',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2018',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 5,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Đỗ Thu Thủy',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Đánh giá hiệu năng các giao thức mạng cảm biến không dây',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.BACHELOR,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2016',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2018',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.REJECTED,
  },
  {
    id: 6,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Hoàng Anh Tuấn',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Phân tích hành vi người dùng trên các trang mạng xã hội bằng kỹ thuật khai phá dữ liệu',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2016',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2018',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 7,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Ngô Thanh Hải',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Nghiên cứu cơ chế đồng thuận trong công nghệ Blockchain',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2016',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2018',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 8,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Võ Văn Hoàng',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Xây dựng hệ thống phát hiện xâm nhập dựa trên học sâu',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2015',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2017',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 9,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Bùi Thị Hà',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Giải thuật lập lịch cho các tác vụ trên môi trường điện toán cạnh',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.RESEARCHER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2015',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2020',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 10,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Lê Mạnh Trường',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Nghiên cứu các giải pháp tiết kiệm năng lượng cho smartphone',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.RESEARCHER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2015',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2022',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.REJECTED,
  },
  {
    id: 11,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Dương Ngọc Lan',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Mô hình hồi quy dự báo giá chứng khoán tại Việt Nam',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2015',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '12/2017',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 12,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Vũ Đức Toàn',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Phân tích hành vi người dùng trên các trang mạng xã hội bằng kỹ thuật khai phá dữ liệu',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2014',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2016',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 13,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Phạm Thị Phương',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Thiết kế hệ thống đề xuất phim dựa trên lọc cộng tác',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2014',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2016',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 14,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Trịnh Quốc Thắng',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Nghiên cứu các kỹ thuật nén dữ liệu trong truyền thông 5G',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2014',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2016',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
  {
    id: 15,
    [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Nguyễn Mai Linh',
    [TRAINING_PRODUCT_RECORD.THESIS_TITLE]:
      'Xây dựng chatbot hỗ trợ tư vấn tuyển sinh đại học',
    [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: '',
    [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EDUCATION_LEVEL.MASTER,
    [TRAINING_PRODUCT_RECORD.START_TIME]: '09/2013',
    [TRAINING_PRODUCT_RECORD.END_TIME]: '08/2015',
    [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: APPROVAL_STATUS.APPROVED,
  },
];

export const handlers = [
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX +
      '/profiles/:userId/training-products',
    withAuth(() => {
      // return new HttpResponse(null, {
      //   status: 500,
      //   statusText: 'Internal Server Error',
      // });

      return HttpResponse.json({
        status: 'success',
        data: mockTrainingProductsRecord,
      });
    }),
  ),

  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX +
      '/profiles/:userId/training-products',
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: {
          id: Math.floor(Math.random() * 10000) + 100,
        },
      });
    }),
  ),

  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX +
      '/profiles/:userId/training-products/:trainingProductId',
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: {},
      });
    }),
  ),

  http.delete(
    import.meta.env.VITE_MOCK_API_PREFIX +
      '/profiles/:userId/training-products/:trainingProductId',
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: {},
      });
    }),
  ),
];
